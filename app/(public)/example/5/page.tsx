"use client"

import {ReactNode, useEffect, useRef, useState} from "react"
import {Circle, Clock, User} from "lucide-react"
import {useInView} from "framer-motion"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {useMediaQuery} from "react-responsive";
import Image from "next/image";

// Unified section data
const sectionData = [
    {
        id: 1,
        title: "Recent Contacts",
        description: "These are your most recent contacts.",
        icon: <Clock className="h-6 w-6 text-primary/60"/>,
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
        content: (
            <p>
                Our discovery phase includes gathering key data, brainstorming internally, and collaborating closely
                to develop a detailed project plan. This sets the project up for success.
            </p>
        ),
    },
    {
        id: 2,
        title: "Favorite Contacts",
        description: "Your favorite contacts.",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
        icon: <div className="text-2xl">❤️</div>,
        content: (
            <p>
                During the wireframing phase, we create structural blueprints. This outlines layout, user flow, and
                interface elements before detailed design.
            </p>
        ),
    },
    {
        id: 3,
        title: "Other Contacts",
        description: "Other miscellaneous contacts.",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
        icon: <User className="h-6 w-6 text-muted-foreground"/>,
        content: (
            <p>
                The content phase focuses on developing messaging and visual assets, ensuring everything aligns with
                brand and project goals.
            </p>
        ),
    },
]

// Scroll-aware section component
const ScrollSection = ({key, section, activeSection, setActiveSection, children}: {
    key: any,
    section: any,
    activeSection: any,
    setActiveSection: any,
    children: ReactNode
}) => {
    const ref = useRef(null)
    const inView = useInView(ref, {margin: "-50% 0px -50% 0px"})

    useEffect(() => {
        if (inView) setActiveSection(section.id)
    }, [inView])

    return (
        <div
            ref={ref}
            className={`min-h-screen p-6 border-b transition-colors duration-300 flex flex-col items-center justify-center ${
                activeSection === section.id ? "bg-muted/20" : ""
            }`}
        >
            {children}
        </div>
    )
}


const CardContent = () => {
    const [activeTab, setActiveTab] = useState("discovery")

    const tabContent = {
        discovery: (
            <p className="text-lg leading-relaxed text-gray-800">
                Our discovery phase, includes gathering key data, brainstorming internally, and collaborating
                closely to develop
                a detailed project plan. To ensure your project is set up for success from the start, we then
                determine a
                competitor analysis, target demographics, and design specifications.
            </p>
        ),
        wireframing: (
            <p className="text-lg leading-relaxed text-gray-800">
                The wireframing phase focuses on creating the structural blueprint of your project. We develop
                low-fidelity
                mockups that outline layout, user flow, and functionality without the distraction of visual design
                elements.
                This allows us to iterate quickly and establish a solid foundation for the user experience.
            </p>
        ),
        content: (
            <p className="text-lg leading-relaxed text-gray-800">
                During the content phase, we develop and organize all textual and visual elements that will populate
                your
                project. This includes copywriting, image selection, video production, and information architecture.
                We ensure
                all content aligns with your brand voice and effectively communicates your message to the target
                audience.
            </p>
        ),
    }

    return (
        <div>

            <div className="space-y-8">
                <div>
                    <p className="text-gray-400 tracking-widest">PHASE 1 / 4</p>
                    <h1 className="text-6xl font-serif mt-4">Planning</h1>
                </div>

                <div className="border-b">
                    <div className="flex space-x-8">
                        <div className="relative pb-2">
                            <button
                                className={`font-medium transition-colors ${activeTab === "discovery" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                                onClick={() => setActiveTab("discovery")}
                            >
                                Discovery
                            </button>
                            {activeTab === "discovery" &&
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>}
                        </div>
                        <div className="relative pb-2">
                            <button
                                className={`font-medium transition-colors ${activeTab === "wireframing" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                                onClick={() => setActiveTab("wireframing")}
                            >
                                Wireframing
                            </button>
                            {activeTab === "wireframing" &&
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>}
                        </div>
                        <div className="relative pb-2">
                            <button
                                className={`font-medium transition-colors ${activeTab === "content" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                                onClick={() => setActiveTab("content")}
                            >
                                Content
                            </button>
                            {activeTab === "content" &&
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>}
                        </div>
                    </div>
                </div>

                <div className="py-8">{tabContent[activeTab as keyof typeof tabContent]}</div>
            </div>
        </div>

    );
};


// Main layout with scrollable sections
 function ScrollableSection() {
    const [activeSection, setActiveSection] = useState(1)

    return (
        <div className="flex w-full">
            {/* Left Panel */}
            <div className="w-1/2 overflow-y-auto">
                {sectionData.map((section) => (
                    <ScrollSection key={section.id}
                                   section={section}
                                   activeSection={activeSection}
                                   setActiveSection={setActiveSection}
                    >
                        <CardContent/>
                    </ScrollSection>
                ))}
            </div>

            {/* Right Panel */}
            <div className="hidden md:flex w-1/2 sticky top-0 h-screen items-center justify-center p-8">
                <div className={"relative w-full"}>
                    <Image src={sectionData[activeSection - 1]?.image} alt={sectionData[activeSection - 1]?.title}
                           objectFit={"cover"}
                           width={500}
                           height={400}
                            />
                </div>
            </div>
        </div>
    )
}


const MobileSection = () => {
    return (
        <div>
            {sectionData.map((section) => (
                <div className={"min-h-screen"}>
                    <div className={"relative w-full h-56 bg-black"}>
                        <Image src={section.image} alt={section.title} fill={true} />
                    </div>
                    <CardContent />
                </div>
            ))}
        </div>
    );
};


// Page export
export default function Example5() {
    const isDesktop = useMediaQuery({query: "(min-width: 728px)"})

    return (
        <main className="container mx-auto flex  min-h-screen flex-col items-center justify-between">
            {isDesktop ? (<ScrollableSection/>) : (<MobileSection/>)}
        </main>
    )
}
