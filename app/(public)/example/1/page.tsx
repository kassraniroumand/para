"use client"

import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react"
import Image from "next/image"
import {useScroll, useTransform, motion, useInView} from "framer-motion"
import {useMediaQuery} from "react-responsive";
import {HomepageData} from "@/types/homepage";
import {useHomePageStore} from "@/app/store/useHomePageStore";

interface CardProps {
    title: string
    description: string
    image: string
    link: string
    color: string
    i: number
    section: number,
    activeSection: number,
    setActiveSection: Dispatch<SetStateAction<number>>
    headerText?: string
}

// Also update the Card component to fix positioning issues
const Card = ({
                  title,
                  description,
                  image,
                  link,
                  color,
                  i,
                  headerText,
                  setActiveSection,
                  section,
                  activeSection
              }: CardProps) => {

    const container = useRef(null)
    // const ref = useRef(null)
    const inView = useInView(container, {margin: "-50% 0px -50% 0px"})

    useEffect(() => {
        if (inView) setActiveSection(section)
    }, [inView])

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 728px)'
    })


    return (
        <div ref={container} className="sticky h-svh flex flex-col justify-center items-center mx-1 sm:mx-10"
             style={{top: isDesktopOrLaptop ? `0vh` : `0vh`}}
        >
            <div
                className="flex flex-col bg-white shadow-xl relative mb-4 h-full w-full  sm:h-2/3 rounded-4xl"
                style={{backgroundColor: color}}
            >
                <div className="flex flex-col sm:flex-row md:flex-row h-full">
                    <div className="order-2 w-full sm:w-1/2 h-1/2 sm:h-full relative flex flex-col justify-center items-center gap-12 px-1 sm:px-24">
                        <h2 className="font-sans text-center m-0 text-3xl font-bold capitalize">{title}</h2>
                        <p className="text-base">
                            {description}
                        </p>
                    </div>
                    <div className="order-1 relative w-full  sm:w-1/2 h-1/2 sm:h-full">
                        <motion.div className="relative w-full h-full">
                            <Image sizes={"100"} fill src={image} alt={`Project by ${title}`} objectFit={"cover"}/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Replace the entire Example1 component with this improved version
const Example1 = () => {
    // const data = data2.homepage.projects
    const homepage = useHomePageStore((state) => state.homepage);
    // Access the state
    const data = homepage?.homepage.projects
    const [activeSection, setActiveSection] = useState(1)

    const container = useRef(null)

    const {scrollYProgress} = useScroll({
        target: container,
        offset: ["start start", "end end"],
    })

    // Get the next project title for header text
    const getNextProjectHeader = (index: number): string => {
        if (data && index < data?.projects.length - 1) {
            return `Next: ${data?.projects[index + 1].title}`
        }
        return "End of Projects"
    }

    return (
        <div className="min-h-screen">
            {/* Responsive Layout */}
            <div className="mx-5 sm:mx-0 flex flex-col lg:flex-row relative gap-2">
                <div
                    className="hidden lg:flex w-full lg:w-1/3 p-6 pb-10  lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto z-10  flex-col justify-center items-center">
                    {data?.projects?.map((project, index) => (
                        <div key={`section-${index}`} className="mb-4">
                            <div className="flex flex-row justify-end gap-4 items-center">
                                <div
                                    className={` text-right text-xl font-medium cursor-pointer transition-colors duration-300 ${
                                        activeSection === index + 1 ? "text-black " : "text-gray-400"
                                    }`}
                                >
                                    {project.title}
                                </div>
                                {activeSection === index + 1 && (
                                    <div className="h-0 border-2 border-b w-5 bg-black"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Projects Section - This is the container for all cards */}
                <div className="w-full lg:w-2/3 relative ">
                    {/* This div is the actual scrollable container */}
                    <div ref={container} className="relative">
                        {data?.projects?.map((project, index) => (
                            <Card key={`p_${index}`}
                                  section={index + 1}
                                  activeSection={activeSection}
                                  setActiveSection={setActiveSection}
                                  color={project.color || ""}
                                  description={project.description || ""}
                                  link={project.link || "/"}
                                  title={project.title || ""}
                                  image={project.image || ""}
                                  i={index}
                                  headerText={getNextProjectHeader(index)}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Example1
