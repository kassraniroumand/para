"use client"

import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react"
import Image from "next/image"
import {motion, useInView, useScroll} from "framer-motion"
import {useMediaQuery} from "react-responsive";
import {useHomePageStore} from "@/app/store/useHomePageStore";

interface CardProps {
    title: string
    description: string
    image: string
    link?: string
    color?: string
    i: number
    section: number,
    activeSection: number,
    setActiveSection: Dispatch<SetStateAction<number>>
    headerText?: string
    tags:  {title: string}[]
}

// Also update the Card component to fix positioning issues
const Card = ({
                  title,
                  description,
                  image,
                  tags,
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
                    <div className={"order-2 w-full sm:w-1/2 h-full flex flex-col justify-center  sm:justify-center items-center px-4 gap-5 "}>
                        <p className={"text-4xl font-medium opacity-80 text-center"}>{title}</p>
                        <p className={"text-sm font-medium opacity-80"}>{description}</p>
                        <div className={"grid grid-cols-2 grid-rows-2 gap-4"}>
                            {tags.map((tag) => (
                                <p className={"border-1 border-black/10 p-4 flex flex-row justify-center items-center  rounded-xl  opacity-80 break-words"}>{tag.title}</p>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 relative w-full h-full rounded-xl  sm:h-full overflow-hidden">
                        <motion.div className="relative w-full h-full overflow-hidden">
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
    const data = homepage?.homepage.sections.advantage
    const [activeSection, setActiveSection] = useState(1)
    console.log("data", data)

    const container = useRef(null)

    const {scrollYProgress} = useScroll({
        target: container,
        offset: ["start start", "end end"],
    })

    // Get the next project title for header text
    const getNextProjectHeader = (index: number): string => {
        if (data && index < data?.length - 1) {
            // return `Next: ${data?[index + 1]?.title}`
            return "fds"
        }
        return "End of Projects"
    }
    return (
        <div className="min-h-screen">
            {/* Responsive Layout */}
            <div className="mx-5 sm:mx-0 flex flex-col lg:flex-row relative gap-2">
                <div className="hidden lg:flex w-full lg:w-1/4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto z-10  flex-col justify-center items-end">
                    {data?.map((project, index) => (
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
                <div className="w-full lg:w-3/4 relative">
                    {/* This div is the actual scrollable container */}
                    <div ref={container} className="relative">
                        {data?.map((project, index) => (
                            <Card key={`p_${index}`}
                                  section={index + 1}
                                tags={project.tags}
                                  activeSection={activeSection}
                                  setActiveSection={setActiveSection}
                                  // color={project?.color || ""}
                                  description={project.description || ""}
                                  // link={project.link || "/"}
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
