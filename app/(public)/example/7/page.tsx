import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Home, Settings, User } from "lucide-react";


type CardItem = {
    image: string
    title: string
    description_1: string;
    description_2: string;
    subTitle: string
    subDescription_1: string
    subDescription_2: string
    items: CardSubItem[];
};

type CardSubItem = {
    title: string;
    description_1: string;
    description_2: string;
}

interface LeftSectionProps {
    title: string
}

interface RightSectionProps {
    card: CardItem;
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

function SubItemAccordion({items}: {items:CardSubItem[]}) {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 w-full">
            <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => (
                    <AccordionItem value={item.title} key={index}>
                        <AccordionTrigger className="text-xl font-semibold"> {item.title}</AccordionTrigger>
                        <AccordionContent>
                            <p className="py-4">
                                {item.description_1}
                            </p>
                            <p className="py-4">
                                {item.description_2}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}


// Right Section
function RightSection({ card }: RightSectionProps) {
    return (
        <div className="p-6 w-full flex flex-col justify-center items-start space-y-6">
            <div className={"relative w-full aspect-square"}>
                <Image src={card.image} alt={card.title} fill={true} objectFit={"cover"} />
            </div>
            <p className={"text-lg font-medium"}>
                {card.description_1}
            </p>
            <p className={"text-lg font-medium"}>
                {card.description_2}
            </p>
            <h1 className={"text-3xl font-semibold mt-10"}>
                {card.subTitle}
            </h1>
            <p className={"text-lg font-medium"}>
                {card.subDescription_1}
            </p>
            <p className={"text-lg font-medium"}>
                {card.subDescription_2}
            </p>
            <div className={"mt-10 w-full"}>
                <SubItemAccordion items={card.items} />
            </div>
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

    const cards: CardItem[] = [
        {
            title: `Branding`,
            image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
            description_1: `Recognised as the no.1 ranked UK web design agency on Clutch out of 7,000+ providers, we’re leading experts in crafting high-performance, unique, and scalable websites that stand out.`,
            description_2: `As an award-winning London web design agency, our team takes a thorough and creative approach to every web design project, ensuring we build a website that’s perfectly tailored to your needs.`,
            subTitle: "Fully Bespoke Web Design",
            subDescription_1: "Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
            subDescription_2: "We focus on delivering a custom-built website that’s fully aligned with your goals and reflects your brands uniqueness.",
            items: [
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                }
            ]
        },
        {
            title: `Branding`,
            image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
            description_1: `Recognised as the no.1 ranked UK web design agency on Clutch out of 7,000+ providers, we’re leading experts in crafting high-performance, unique, and scalable websites that stand out.`,
            description_2: `As an award-winning London web design agency, our team takes a thorough and creative approach to every web design project, ensuring we build a website that’s perfectly tailored to your needs.`,
            subTitle: "Fully Bespoke Web Design",
            subDescription_1: "Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
            subDescription_2: "We focus on delivering a custom-built website that’s fully aligned with your goals and reflects your brands uniqueness.",
            items: [
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                },
                {
                    title:"Fully Bespoke web design",
                    description_1:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!",
                    description_2:"Our London based web design team creates websites tailored to your specific needs with zero templates, site builders, or boring designs!"
                }
            ]
        },
    ]

    return (
        <div className={"container mx-auto"}>
            {cards.map((card) => (
                <FixedScrollLayout
                    leftSection={<LeftSection title={card.title} />}
                    rightSection={<RightSection card={card} />}
                />
            ))}
        </div>
    );
}
