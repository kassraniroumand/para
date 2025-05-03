"use client"
import {HomepageData} from "@/types/homepage";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";


  const pros = [
    {title: "test1", description: "test1", image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"},
    {title: "test1", description: "test1", image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"},
    {title: "test1", description: "test1", image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"},
    {title: "test1", description: "test1", image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"},
    {title: "test1", description: "test1", image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"}
  ]


const MovingBoxesRow = () => {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visibleBoxes, setVisibleBoxes] = useState(1); // Default to 1 box
  const boxWidth = 300; // Each box is 300px wide
  const originalBoxes = [1, 2, 3, 4, 5];
  const boxes = [...originalBoxes, ...originalBoxes];

  // Animation definition
  const animationProps = {
    x: ['0%', `-${(boxWidth * originalBoxes.length)}px`],
    transition: {
      x: {
        repeat: Infinity,
        duration: originalBoxes.length * 3,
        ease: 'linear'
      }
    }
  };

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      setVisibleBoxes(isMobile ? 1 : Math.floor(window.innerWidth / boxWidth));

      const handleResize = () => {
        setVisibleBoxes(isMobile ? 1 : Math.floor(window.innerWidth / boxWidth));
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  useEffect(() => {
    controls.start(animationProps);
  }, [controls, isMobile]);

  return (
      <div style={{
        overflow: 'hidden',
        width: `${boxWidth * visibleBoxes}px`,
        maxWidth: '100%',
        position: 'relative',
        margin: '0 auto'
      }}>
        <motion.div
            style={{
              display: 'flex',
              width: 'max-content'
            }}
            animate={controls}
            onHoverStart={() => !isMobile && controls.stop()}
            onHoverEnd={() => !isMobile && controls.start(animationProps)}
        >
          {boxes.map((box, index) => (
              <motion.div
                  key={`${box}-${index}`}
                  style={{
                    width: `${boxWidth}px`,
                    height: '200px',
                    backgroundColor: index < originalBoxes.length ? 'blue' : 'lightblue',
                    marginRight: '10px',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  onTapStart={() => isMobile && controls.stop()}
                  onTapCancel={() => isMobile && controls.start(animationProps)}
                  onPanStart={() => isMobile && controls.stop()}
                  onPanEnd={() => isMobile && controls.start(animationProps)}
              />
          ))}
        </motion.div>
      </div>
  );
};


export default function Home({data}: {data: HomepageData['homepage']['hero']}) {


  return (
    <main className="flex flex-col items-center justify-center bg-white">
      <section className="h-[70svh] flex flex-col items-center justify-center bg-white">
        {/* Heading - Different layouts for mobile and desktop */}
        <h1 className="font-bold tracking-tight text-black mb-6">
          {/* Mobile heading (stacked) */}
          <span className="block text-3xl sm:text-4xl md:hidden">
            Design, Development &<br />
            Marketing for Agencies,
            <br />
            Startups & Solo Founders.
          </span>

          {/* Desktop heading (with different line breaks) */}
          <span className="hidden md:block md:text-5xl lg:text-6xl">
            Design, Development & Marketing for
            <br />
            Agencies, Startups & Solo Founders.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 px-2">
          We assign our trained wizards to your project who develop, design, and digitally market your business. Hire us
          and see the magic happen
        </p>

        {/* Buttons - Stacked on mobile, side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-24 px-8 sm:px-0">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Book A Free Call
          </a>
          <a
            href="#work"
            className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Recent Work
          </a>
        </div>

        {/*<div className="mt-16">*/}
        {/*  <p className="text-gray-500 mb-10">As seen on</p>*/}

        {/*  /!* Mobile: 2x2 grid *!/*/}
        {/*  <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:hidden">*/}
        {/*    {data?.as_seen_on.brands.map((brand) => (*/}
        {/*        <div className="opacity-40">*/}
        {/*          <h1>{brand['title']}</h1>*/}
        {/*          <Image src={brand['image']} width={120} height={50} alt={"fdas"}/>*/}
        {/*          /!*<img src="/placeholder.svg?height=40&width=120" alt="Land-book" width={120} height={40} />*!/*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*    /!*<div className="opacity-40">*!/*/}
        {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="Land-book" width={120} height={40} />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div className="opacity-40">*!/*/}
        {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="Product Hunt" width={120} height={40} />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div className="opacity-40">*!/*/}
        {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="awwwards" width={120} height={40} />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div className="opacity-40">*!/*/}
        {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="DESIGNMUNK" width={120} height={40} />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*  </div>*/}

        {/*  /!* Desktop: Row *!/*/}
        {/*  <div className="hidden md:flex flex-wrap justify-center items-center gap-12">*/}
        {/*    {data?.as_seen_on.brands.map((brand) => (*/}
        {/*        <div className="opacity-70 hover:opacity-100 transition-opacity">*/}
        {/*          <h1>{brand['title']}</h1>*/}
        {/*          <Image src={brand['image']} width={120} height={40} alt={"fdas"}/>*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </section>

      <div className={"bg-red-300 h-[30svh] w-full"}>
        <MovingBoxesRow />
      </div>

    </main>
  )
}
