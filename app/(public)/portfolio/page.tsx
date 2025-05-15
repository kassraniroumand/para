"use client"
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import {useGetPortfolioPage} from "@/app/hooks/usePortfolioPage";

export default function CenteredScrollContent() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    

    const {data: portfolios} = useGetPortfolioPage();
    const contents = portfolios.portfolioPage.sections.sites.map((item) => ({
        title: item.title,
        description: item.description[0],
        color: "bg-purple-700",
        imageUrl: item.image,
    }))


    // Use Framer Motion's useScroll hook
    const { scrollYProgress } = useScroll();

    // Map the scroll progress to the content index
    const contentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, contents.length - 1]
    );

    // Update the active index based on scrollYProgress
    useEffect(() => {
        // Get the current value initially
        const currentIndex = Math.round(contentIndex.get());
        setActiveIndex(currentIndex);

        // Use the recommended non-deprecated approach
        return contentIndex.on("change", (latest) => {
            setActiveIndex(Math.round(latest));
        });
    }, [contentIndex]);

    return (
        <>
            {/* Fixed container for the centered content */}
            <div className="bg-black fixed inset-0 flex items-center justify-center">
                <div className="w-full h-full px-4">
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                        {/* Only render the active content based on current index */}
                        <div className="absolute inset-0 w-full h-full">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-full overflow-hidden rounded-xl flex sm:flex-row flex-col">
                                    {/* Image container - doesn't fade */}
                                    <div className="relative sm:w-[50svw] aspect-square w-full overflow-hidden">
                                        <Image
                                            fill={true}
                                            sizes="(max-width: 768px) 100vw, 66vw"
                                            src={contents[activeIndex].imageUrl}
                                            alt={contents[activeIndex].title}
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content container */}
                                    <div className="sm:w-1/2 w-full">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                            className={`p-8 h-full flex flex-col justify-center items-center`}
                                        >
                                            <h2 className="text-3xl font-bold mb-4 text-white">{contents[activeIndex].title}</h2>
                                            <p className="text-lg leading-relaxed text-white">{contents[activeIndex].description}</p>

                                            <div className="mt-6 flex items-center text-sm opacity-80">
                                                <div className="w-8 h-0.5 bg-white/50 mr-3"></div>
                                                <span className="text-white">Scroll to explore</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>

            {/* This creates scrollable space */}
            <div ref={containerRef} className="w-full" style={{ height: `${contents.length * 100}vh` }} />
        </>
    );
}
