"use client"
import React, {useEffect, useRef} from 'react';
import {motion, useInView, useScroll, useTransform} from "framer-motion";

const RightSection = () => {
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
            className=" h-[180svh]  flex items-center justify-center  text-2xl bg-black"
        >
            <motion.div className={"text-white"}  style={{ opacity}}>
                right section - {isInView ? 'in view' : 'not in view'}
            </motion.div>
        </motion.div>
    );
};

const LeftSection = () => {
    return (
        <div>
            left section
        </div>
    );
};

type FixedScrollLayoutProps = {
    leftSection: React.ReactNode
    rightSection: React.ReactNode
}

// Layout
 function FixedScrollLayout({
                                      leftSection,
                                      rightSection,
                                  }: FixedScrollLayoutProps) {
    return (
        <div className=" flex bg-black flex-col md:flex-row min-h-screen">
            {/* Left section - fixed */}
            <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen p-6">
                {leftSection}
            </div>

            {/* Right section - scrollable */}
            <div className="w-full md:w-1/2 bg-white">
                {rightSection}
                {rightSection}
                {rightSection}
                {rightSection}
                {rightSection}
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
                rightSection={<RightSection />}
            />
        </motion.div>
    );
};

export default Example8;