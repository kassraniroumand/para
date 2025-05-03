"use client"
import React, {useEffect, useRef} from 'react';
import {motion, useInView, useScroll, useTransform} from "framer-motion";

const RightSection = ({index, title, description} : {index:number, title:string, description:string}) => {
    const ref = useRef(null);
    const isInView = useInView(ref);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"], // start fade when top reaches bottom, end when center reaches center
    });

    // Fade in and slide up
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <motion.div
            ref={ref}
            className=" h-[100svh]  flex items-center justify-center  text-2xl bg-black"
        >
            <motion.div className={"text-white flex flex-col justify-center items-center w-full gap-10 px-5"}  style={{ opacity}}>
                <p className={"text-5xl font-light"}>
                    {index}
                </p>
                <p className={"text-5xl font-bold"}>
                    {title}
                </p>
                <p className={"text-center text-base font-light"}>
                    {description}
                </p>
            </motion.div>
        </motion.div>
    );
};

const LeftSection = () => {
    return (
        <div className={"text-white font-bold text-2xl sm:text-6xl flex flex-col items-center justify-center w-full h-full"}>
            Process to Get Things Done
        </div>
    );
};

type FixedScrollLayoutProps = {
    leftSection: React.ReactNode
}


const data = [
    {title: "Free Call", description: "Book a free call with a consultan, choose your convinent time to connect"},
    {title: "Free Call", description: "Book a free call with a consultan, choose your convinent time to connect"},
    {title: "Free Call", description: "Book a free call with a consultan, choose your convinent time to connect"},
    {title: "Free Call", description: "Book a free call with a consultan, choose your convinent time to connect"},
    {title: "Free Call", description: "Book a free call with a consultan, choose your convinent time to connect"}
]

// Layout
 function FixedScrollLayout({
                                      leftSection,
                                  }: FixedScrollLayoutProps) {
    return (
        <div className=" flex bg-black flex-col md:flex-row min-h-screen">
            {/* Left section - fixed */}
            <div className="w-full md:w-1/2 sticky top-0 md:h-screen p-6">
                {leftSection}
            </div>

            {/* Right section - scrollable */}
            <div className="w-full md:w-1/2 bg-white">
                {data.map((item, index) => (
                    <RightSection index={index} title={item.title} description={item.description} />
                ))}
            </div>
        </div>
    );
}


const Example8 = () => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"], // from bottom of viewport to center
    });

    // Animate width from 50% to 100%
    const width = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);

    return (

        <motion.div
            ref={ref}
            style={{ width }}
            className="h-fit  mx-auto my-32 rounded-lg"
        >            <FixedScrollLayout
                leftSection={<LeftSection />}
            />
        </motion.div>
    );
};

export default Example8;