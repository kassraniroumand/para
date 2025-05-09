"use client"
import React, {useEffect, useRef, useState} from "react";


interface LeftSectionProps {
    title: string
}

interface RightSectionProps {
    service: HomepageData['homepage']['sections']['services'];
}

interface FixedScrollLayoutProps {
    leftSection: React.ReactNode;
    rightSection: React.ReactNode;
}

// Left Section
function LeftSection({ title }: LeftSectionProps) {
    return (
        <>
            <div className="hidden h-full sm:flex flex-col gap-4">
                {title.split(" ").map(word => (
                    <h3 className="font-serif text-9xl font-medium">{word}</h3>
                ))}
            </div>
            <div className="flex h-full sm:hidden flex-col gap-4">
                    <h3 className="font-serif text-5xl font-medium">{title}</h3>

            </div>
        </>
    );
}


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image";
import {AnimatePresence, useInView, motion} from "framer-motion";

import {  useAnimation } from "framer-motion";
import {useHomePageStore} from "@/app/store/useHomePageStore";
import {HomepageData, servicesType} from "@/app/types";

function SubItemAccordion({items}: {items: servicesType['_type'][number]["services"][number][]}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    const [openItem, setOpenItem] = useState<string | null>(null);
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start(i => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                }
            }));
        } else {
            controls.start({ opacity: 0, y: 20 });
        }
    }, [isInView, controls]);

    const handleAccordionToggle = (value: string) => {
        setOpenItem(openItem === value ? null : value);
    };

    return (
        <div ref={ref} className="py-8 px-4 w-full">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                value={openItem!!}
                onValueChange={handleAccordionToggle}
            >
                {items?.map((item, index) => {
                    const isOpen = openItem === `${item.title}-${index}`;
                    return (
                        <motion.div
                            key={index}
                            custom={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={controls}
                            className="mb-2"
                        >
                            <AccordionItem
                                value={`${item.title}-${index}`}
                            >
                                <AccordionTrigger className="text-xl font-semibold opacity-70">
                                    {item.title}
                                </AccordionTrigger>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4">
                                                <p className="py-2">{item.description_1}</p>
                                                <p className="py-2">{item.description_2}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </AccordionItem>
                        </motion.div>
                    );
                })}
            </Accordion>
        </div>
    );
}

// Right Section
function RightSection({ service }: { service: servicesType["_type"][number]}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    const controls = useAnimation();
    console.log("service", service)
    useEffect(() => {
        if (isInView) {
            controls.start(i => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.2,
                    duration: 0.3,
                    ease: "easeOut"
                }
            }));
        } else {
            controls.start(i => ({
                opacity: 0,
                y: 20,
                transition: {
                    duration: 0.2,
                    ease: "easeIn"
                }
            }));
        }
    }, [isInView, controls]);

    return (
        <div ref={ref} className="p-6 w-full flex flex-col justify-center items-start gap-6">
            <motion.div
                className={"relative w-full aspect-square"}
                custom={0}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
            >
                <Image src={service?.serviceImage} alt={service?.serviceTitle} fill={true} objectFit={"cover"} />
            </motion.div>



            <motion.p
                className={"text-base sm:text-lg font-normal opacity-80"}
                custom={1}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                dangerouslySetInnerHTML={{ __html: service?.serviceDescription_1 }}
            />

            <motion.p
                className={"text-base sm:text-lg font-normal opacity-80"}
                custom={2}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
            >
                {service?.serviceDescription_2}
            </motion.p>

            <motion.h1
                className={"text-3xl font-semibold mt-10 opacity-80"}
                custom={3}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
            >
                {service?.serviceTitle_2}
            </motion.h1>

            <motion.p
                className={"text-base sm:text-lg font-normal opacity-80"}
                custom={4}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
            >
                {service?.serviceDescription_3}
            </motion.p>

            <motion.p
                className={"text-base sm:text-lg font-normal opacity-80"}
                custom={5}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
            >
                {service?.serviceDescription_4}
            </motion.p>

            <SubItemAccordion items={service?.services} />
        </div>
    );
}

// Layout
function FixedScrollLayout({
                                      leftSection,
                                      rightSection,
                                  }: FixedScrollLayoutProps) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left section - fixed */}
            <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen p-6">
                {leftSection}
            </div>

            {/* Right section - scrollable */}
            <div className="w-full md:w-1/2 bg-white h-full">{rightSection}</div>
        </div>
    );
}

// Parent Component
export default function Example7() {


    const homepage = useHomePageStore((state) => state.homepage);
    const services = homepage?.homepage.sections.services;
    return (
        <div className={"container mx-auto"}>
            {services?.map((service) => (
                <FixedScrollLayout
                    leftSection={<LeftSection title={service.serviceTitle} />}
                    rightSection={<RightSection service={service} />}
                />
            ))}
        </div>
    );
}
