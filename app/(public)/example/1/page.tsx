// "use client"
//
// import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react"
// import Image from "next/image"
// import {useScroll, useTransform, motion, useInView} from "framer-motion"
// import {useMediaQuery} from "react-responsive";
// import {HomepageData} from "@/types/homepage";
//
// interface CardProps {
//     title: string
//     description: string
//     image: string
//     link: string
//     color: string
//     i: number
//     section: number,
//     activeSection: number,
//     setActiveSection: Dispatch<SetStateAction<number>>
//     headerText?: string
// }
//
// // Also update the Card component to fix positioning issues
// const Card = ({
//                   title,
//                   description,
//                   image,
//                   link,
//                   color,
//                   i,
//                   headerText,
//                   setActiveSection,
//                   section,
//                   activeSection
//               }: CardProps) => {
//
//     const container = useRef(null)
//     // const ref = useRef(null)
//     const inView = useInView(container, {margin: "-50% 0px -50% 0px"})
//
//     useEffect(() => {
//         if (inView) setActiveSection(section)
//     }, [inView])
//
//     const isDesktopOrLaptop = useMediaQuery({
//         query: '(min-width: 728px)'
//     })
//
//     const {scrollYProgress} = useScroll({
//         target: container,
//         offset: ["start start", "start start"],
//     })
//     const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
//     return (
//         <div ref={container} className="sticky h-svh flex flex-col justify-center items-center" style={{top: isDesktopOrLaptop ? `0vh` : `0vh`}}
//         >
//             <div
//                 className="flex flex-col bg-white shadow-xl relative mb-4 h-full w-full  sm:h-2/3 rounded-4xl"
//                 style={{backgroundColor: color}}
//             >
//                 <h2 className="text-center m-0 text-[28px] font-bold">{title}</h2>
//                 <div className="flex flex-col md:flex-row h-full mt-[30px] md:mt-[50px] gap-[30px] md:gap-[50px]">
//                     <div className="w-full md:w-[40%] relative">
//                         <h3 className="text-xl font-bold mb-4">{headerText || title}</h3>
//                         <p className="text-[16px]">
//                             <span className="text-[28px] font-serif">{description[0]}</span>
//                             {description.slice(1)}
//                         </p>
//                         <span className="flex items-center gap-1 mt-4">
//               <a href={link} target="_blank" rel="noopener noreferrer" className="text-[14px] underline cursor-pointer">
//                 See more
//               </a>
//               <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                     d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
//                     fill="black"
//                 />
//               </svg>
//             </span>
//                     </div>
//                     <div className="relative w-full md:w-[60%] h-[300px] md:h-full rounded-[25px] overflow-hidden">
//                         <motion.div className="w-full h-full" style={{scale: imageScale}}>
//                             <Image fill src={image} alt={`Project by ${title}`} className="object-cover"/>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// // Replace the entire Example1 component with this improved version
// const Example1 = ({ data }: {  data: HomepageData['homepage']['projects'] }) => {
//     // const data = data2.projects.projects
//
//     const [activeSection, setActiveSection] = useState(1)
//
//     const container = useRef(null)
//     const {scrollYProgress} = useScroll({
//         target: container,
//         offset: ["start start", "end end"],
//     })
//
//     // Get the next project title for header text
//     const getNextProjectHeader = (index: number): string => {
//         if (index < data.projects.length - 1) {
//             return `Next: ${data.projects[index + 1].title}`
//         }
//         return "End of Projects"
//     }
//     return (
//         <div className="container mx-auto  min-h-screen">
//             {/* Responsive Layout */}
//             <div className="flex flex-col lg:flex-row relative gap-2">
//                 <div className="hidden lg:flex w-full lg:w-1/3 p-6 pb-10  lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto z-10  flex-col justify-center items-center">
//                     {data.projects.map((project, index) => (
//                         <div key={`section-${index}`} className="mb-4">
//                             <div className="flex flex-row justify-end gap-4 items-center">
//                                 <div
//                                     className={` text-right text-xl font-medium cursor-pointer transition-colors duration-300 ${
//                                         activeSection === index+1 ? "text-black " : "text-gray-400"
//                                     }`}
//                                 >
//                                     {project.title}
//                                 </div>
//                                 {activeSection === index + 1 && (
//                                     <div className="h-0 border-2 border-b w-5 bg-black"></div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* Projects Section - This is the container for all cards */}
//                 <div className="w-full lg:w-2/3 relative ">
//                     {/* This div is the actual scrollable container */}
//                     <div ref={container} className="relative">
//                         {data.projects.map((project, index) => (
//                             <Card key={`p_${index}`}
//                                   section={index + 1}
//                                   activeSection={activeSection}
//                                   setActiveSection={setActiveSection}
//                                   color={project.color || ""}
//                                   description={project.description || ""}
//                                   link={project.link || "/"}
//                                   title={project.title || ""}
//                                   image={project.image || ""}
//                                   i={index} headerText={getNextProjectHeader(index)}/>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Example1
import React from 'react';

const Example1 = () => {
    return (
        <div>
            
        </div>
    );
};

export default Example1;