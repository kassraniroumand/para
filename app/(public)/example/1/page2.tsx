// "use client"
//
// import { useRef } from "react"
// import Image from "next/image"
// import { useScroll, useTransform, motion } from "framer-motion"
//
// export const projects = [
//     {
//         title: "Matthias Leidinger",
//         description:
//             "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
//         src: "rock.jpg",
//         link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
//         color: "#BBACAF",
//     },
//     {
//         title: "Clément Chapillon",
//         description:
//             "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes - so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves.",
//         src: "tree.jpg",
//         link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
//         color: "#977F6D",
//     },
//     {
//         title: "Zissou",
//         description:
//             "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal, they're encoded with an ambiguity - a certain tension - that lets the viewer find their own story within them.",
//         src: "water.jpg",
//         link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
//         color: "#C2491D",
//     },
// ]
//
// interface CardProps {
//     title: string
//     description: string
//     src: string
//     link: string
//     color: string
//     i: number
//     headerText?: string
// }
//
// const Card = ({ title, description, src, link, color, i, headerText }: CardProps) => {
//     const container = useRef(null)
//     const { scrollYProgress } = useScroll({
//         target: container,
//         offset: ["start end", "start start"],
//     })
//     const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
//
//     return (
//         <div ref={container} className="h-[80vh] flex items-start justify-center sticky top-[15vh] sm:top-[10vh]">
//             <div
//                 className="flex flex-col relative h-auto md:h-[500px] w-[90vw] md:w-[80vw] max-w-[1000px] rounded-[25px] p-[20px] md:p-[50px] shadow-lg"
//                 style={{ backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
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
//                         <motion.div className="w-full h-full" style={{ scale: imageScale }}>
//                             <Image fill src={`/images/${src}`} alt={`Project by ${title}`} className="object-cover" />
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// const Example1 = () => {
//     const container = useRef(null)
//     const { scrollYProgress } = useScroll({
//         target: container,
//         offset: ["start start", "end end"],
//     })
//
//     // Get the next project title for header text
//     const getNextProjectHeader = (index: number): string => {
//         if (index < projects.length - 1) {
//             return `Next: ${projects[index + 1].title}`
//         }
//         return "End of Projects"
//     }
//
//     return (
//         <div className="min-h-screen">
//             {/* Responsive Layout */}
//             <div className="flex flex-col lg:flex-row">
//                 {/* Intro Section - Fixed on desktop, scrolls on mobile */}
//                 <div className="w-full lg:w-1/3 p-6 pb-10 bg-gray-100 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
//                     <div className="lg:pt-[15vh]">
//                         <h2 className="text-2xl md:text-3xl font-bold mb-4">Photography Projects</h2>
//                         <div className="space-y-4">
//                             <p className="text-base md:text-lg">
//                                 This collection showcases exceptional photography projects from around the world, each with a unique
//                                 perspective and story.
//                             </p>
//                             <p className="text-base md:text-lg">
//                                 Scroll down to explore each project and discover the beauty captured through these photographers'
//                                 lenses.
//                             </p>
//                             <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
//                                 <h3 className="text-xl font-bold mb-2">Featured Project</h3>
//                                 <p className="text-base">{projects[0].title}</p>
//                                 <div className="mt-4 h-[100px] relative rounded-md overflow-hidden">
//                                     <Image
//                                         fill
//                                         src={`/images/${projects[0].src}`}
//                                         alt={`Preview of ${projects[0].title}`}
//                                         className="object-cover"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Projects Section */}
//                 <div ref={container} className="w-full lg:w-2/3 mt-4 lg:mt-0">
//                     {projects.map((project, i) => (
//                         <Card key={`p_${i}`} {...project} i={i} headerText={getNextProjectHeader(i)} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Example1
//
// // "use client"
// // import React, {useRef} from 'react';
// // import Image from "next/image";
// //
// // import {useScroll, useTransform, motion} from "framer-motion";
// //
// // export const projects = [
// //
// //     {
// //
// //         title: "Matthias Leidinger",
// //
// //         description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
// //
// //         src: "rock.jpg",
// //
// //         link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
// //
// //         color: "#BBACAF"
// //
// //     },
// //
// //     {
// //
// //         title: "Clément Chapillon",
// //
// //         description: "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes - so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves.",
// //
// //         src: "tree.jpg",
// //
// //         link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
// //
// //         color: "#977F6D"
// //
// //     },
// //
// //     {
// //
// //         title: "Zissou",
// //
// //         description: "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal, they're encoded with an ambiguity - a certain tension - that lets the viewer find their own story within them.",
// //
// //         src: "water.jpg",
// //
// //         link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
// //
// //         color: "#C2491D"
// //
// //     }
// //
// // ]
// //
// // interface CardProps {
// //     title: string;
// //     description: string;
// //     src: string;
// //     link: string;
// //     color: string;
// //     i: number;
// //     headerText?: string;
// // }
// //
// // const Card = ({title, description, src, link, color, i, headerText}: CardProps) => {
// //     const container = useRef(null);
// //     const {scrollYProgress} = useScroll({
// //         target: container,
// //         offset: ['start end', 'start start']
// //     });
// //     const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
// //
// //     return (
// //         <div ref={container} className="h-[80vh] flex items-start justify-center sticky top-60 sm:top-50">
// //             <div
// //                 className={`flex flex-col relative h-[500px] w-vw max-w-2/3 rounded-[25px] p-[30px] md:p-[50px]`}
// //                 style={{backgroundColor: color, top: `calc(-5vh + ${i * 25}px)`}}
// //             >
// //                 <h2 className="text-center m-0 text-[28px]">{title}</h2>
// //                 <div className="flex flex-col md:flex-row h-full mt-[50px] gap-[50px]">
// //                     <div className="w-full md:w-[40%] relative top-[10%]">
// //                         <h3 className="text-xl font-bold mb-4">{headerText || title}</h3>
// //                         <p className="text-[16px]">
// //                             <span className="text-[28px] font-title">{description[0]}</span>
// //                             {description.slice(1)}
// //                         </p>
// //                         <span className="flex items-center gap-1">
// //                             <a href={link} target="_blank" className="text-[12px] underline cursor-pointer">
// //                                 See more
// //                             </a>
// //                             <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                                 <path
// //                                     d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
// //                                     fill="black"/>
// //                             </svg>
// //                         </span>
// //                     </div>
// //                     <div className="relative w-full md:w-[60%] h-full rounded-[25px] overflow-hidden">
// //                         <motion.div className="w-full h-full" style={{scale: imageScale}}>
// //                             <Image
// //                                 fill
// //                                 src={`/images/${src}`}
// //                                 alt="image"
// //                                 className="object-cover"
// //                             />
// //                         </motion.div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }
// //
// // const Example1 = () => {
// //     const container = useRef(null);
// //     const headerRef = useRef(null);
// //
// //     const {scrollYProgress} = useScroll({
// //         target: container,
// //         offset: ['start start', 'end end']
// //     });
// //
// //     const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
// //     const headerBackground = useTransform(
// //         scrollYProgress,
// //         [0, 0.1],
// //         ["rgba(59, 130, 246, 1)", "rgba(59, 130, 246, 0.9)"]
// //     );
// //
// //     // Get the next project title for header text
// //     const getNextProjectHeader = (index: number): string => {
// //         if (index < projects.length - 1) {
// //             return projects[index + 1].title;
// //         }
// //         return "End of Projects";
// //     };
// //
// //     return (
// //         <div className="min-h-screen">
// //             {/* Responsive Layout */}
// //             <div>
// //
// //                 {/* Mobile: Single Column with Next Section Title */}
// //                 <div>
// //                     <div className="p-6 pb-10 bg-gray-100 sticky top-0">
// //                         <h2 className="text-2xl font-bold mb-4">About These Projects</h2>
// //                         <div className="space-y-4">
// //                             <p className="text-base">
// //                                 This collection showcases exceptional photography projects from around the world.
// //                             </p>
// //                             {/* Preview of first project title */}
// //                             <h3 className="text-xl font-bold mt-6">{projects[0].title}</h3>
// //                         </div>
// //                     </div>
// //                     <div ref={container} className="mt-24">
// //                         {projects.map((project, i) => (
// //                             <Card
// //                                 key={`p_${i}`}
// //                                 {...project}
// //                                 i={i}
// //                                 headerText={getNextProjectHeader(i)}
// //                             />
// //                         ))}
// //                     </div>
// //                 </div>
// //
// //
// //                 {/* Desktop: Two Columns */}
// //                 {/*<div className="hidden md:flex h-svh">*/}
// //                 {/*    /!* Fixed Text Column *!/*/}
// //                 {/*    /!*<div className="w-1/2 sticky top-20 h-full p-8 overflow-y-auto bg-gray-100">*!/*/}
// //                 {/*    /!*    <h2 className="text-3xl font-bold mb-6">About These Projects</h2>*!/*/}
// //                 {/*    /!*    <div className="space-y-6">*!/*/}
// //                 {/*    /!*        /!* ... your text content *!/*!/*/}
// //                 {/*    /!*    </div>*!/*/}
// //                 {/*    /!*</div>*!/*/}
// //
// //                 {/*    /!* Scrollable Content Column *!/*/}
// //                 {/*    <div ref={container} className="w-full overflow-y-auto">*/}
// //                 {/*        {projects.map((project, i) => (*/}
// //                 {/*            <Card*/}
// //                 {/*                key={`p_${i}`}*/}
// //                 {/*                {...project}*/}
// //                 {/*                i={i}*/}
// //                 {/*                headerText={getNextProjectHeader(i)}*/}
// //                 {/*            />*/}
// //                 {/*        ))}*/}
// //                 {/*    </div>*/}
// //                 {/*</div>*/}
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default Example1;
