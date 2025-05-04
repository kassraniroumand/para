"use client"

import React, {ReactNode, useEffect, useRef, useState} from "react"
import {Circle, Clock, Moon, Sun, User} from "lucide-react"
import {useInView} from "framer-motion"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {useMediaQuery} from "react-responsive";
import Image from "next/image";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import { CardContent } from "@/components/ui/card"

// const tabs = ["Overview", "Integrations", "Activity", "Domains", "Usage", "Monitoring"]

interface TabProps {
    tabs: string[];
    children: React.ReactNode[];
    defaultActiveIndex?: number;
    darkMode?: boolean;
    hoverColor?: string;
    activeColor?: string;
    inactiveColor?: string;
    indicatorHeight?: string;
    tabPadding?: string;
    tabFontSize?: string;
    className?: string;
    contentClassName?: string;
}

const Tabs: React.FC<TabProps> = ({
                                      tabs,
                                      children,
                                      defaultActiveIndex = 0,
                                      darkMode = false,
                                      hoverColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(14, 15, 17, 0.08)',
                                      activeColor = darkMode ? '#ffffff' : '#0e0f11',
                                      inactiveColor = darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(14, 15, 17, 0.6)',
                                      indicatorHeight = '2px',
                                      tabPadding = '8px 12px',
                                      tabFontSize = '0.875rem',
                                      className = '',
                                      contentClassName = '',
                                  }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [hoverStyle, setHoverStyle] = useState({});
    const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
    const [isDarkMode, setIsDarkMode] = useState(darkMode);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Validate that tabs and children match
    useEffect(() => {
        if (tabs.length !== children.length) {
            console.warn('The number of tabs does not match the number of children elements');
        }
    }, [tabs, children]);

    useEffect(() => {
        if (hoveredIndex !== null) {
            const hoveredElement = tabRefs.current[hoveredIndex];
            if (hoveredElement) {
                const { offsetLeft, offsetWidth } = hoveredElement;
                setHoverStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                });
            }
        }
    }, [hoveredIndex]);

    useEffect(() => {
        const activeElement = tabRefs.current[activeIndex];
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement;
            setActiveStyle({
                left: `${offsetLeft}px`,
                width: `${offsetWidth}px`,
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        requestAnimationFrame(() => {
            const activeElement = tabRefs.current[activeIndex];
            if (activeElement) {
                const { offsetLeft, offsetWidth } = activeElement;
                setActiveStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                });
            }
        });
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <div className={`flex flex-col w-full ${isDarkMode ? 'dark bg-[#0e0f11]' : ''} ${className}`}>
            <div className={`w-full border-none shadow-none relative flex items-start justify-center ${isDarkMode ? 'bg-transparent' : ''}`}>
                <div className="p-0 w-full h-full">
                    <div className="relative">
                        {/* Hover Highlight */}
                        <div
                            className="absolute transition-all duration-300 ease-out rounded-[6px] flex items-center"
                            style={{
                                ...hoverStyle,
                                opacity: hoveredIndex !== null ? 1 : 0,
                                backgroundColor: hoverColor,
                                height: `calc(${tabPadding.split(' ')[0]} * 2 + 1em)`,
                            }}
                        />

                        {/* Active Indicator */}
                        <div
                            className="absolute bottom-[-6px] transition-all duration-300 ease-out"
                            style={{
                                ...activeStyle,
                                backgroundColor: activeColor,
                                height: indicatorHeight,
                            }}
                        />

                        {/* Tabs */}
                        <div className="relative flex space-x-[6px] items-center">
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    ref={(el: HTMLDivElement | null) => {
                                        tabRefs.current[index] = el;
                                    }}
                                    className={`cursor-pointer transition-colors duration-300 flex items-center justify-center`}
                                    style={{
                                        padding: tabPadding,
                                        color: index === activeIndex ? activeColor : inactiveColor,
                                        fontSize: tabFontSize,
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className={`mt-4 ${contentClassName}`}>
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        style={{ display: index === activeIndex ? 'block' : 'none' }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Unified section data

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


const CardContent2 = ({title, tabs, index,total}: {index: number,
    total: number,
    title: string, tabs: {title:string, description:string}[]}) => {
    const [activeTab, setActiveTab] = useState('account');

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
    // const tabs = ["Overview", "Integrations", "Activity"];
    return (
        <>
            <div className="space-y-8 justify-center items-start flex flex-col w-full">
                <div className={"mt-4 w-full flex flex-col items-center sm:items-start justify-center"}>
                    <p className="text-gray-400 tracking-widest">PHASE {index} / {total}</p>
                    <h1 className="text-4xl  font-serif mt-4">{title}</h1>
                </div>

                <div className="w-full px-5 sm:px-0">
                    <Tabs
                        tabs={tabs.map(tab=>tab.title)}
                        contentClassName="p-4 border rounded-lg"
                    >
                        {tabs.map((tab, index) => (
                            <div>
                                {tab.description}
                            </div>
                        ))}
                    </Tabs>
                </div>
            </div>
        </>

    );
};


// Main layout with scrollable sections
 function ScrollableSection({sectionData}: {sectionData: any}) {
    const [activeSection, setActiveSection] = useState(1)

    return (
        <div className="flex w-full">
            {/* Left Panel */}
            <div className="w-1/2 overflow-y-auto">
                {sectionData.map((section,index) => (
                    <ScrollSection key={section.id}
                                   section={section}
                                   activeSection={activeSection}
                                   setActiveSection={setActiveSection}
                    >
                        <CardContent2
                            total={sectionData.length}
                            index={index+1} title={section.title} tabs={section.tabs}  />
                    </ScrollSection>
                ))}
            </div>

            {/* Right Panel */}
            <div className="hidden md:flex w-1/2 sticky top-0 h-screen items-center justify-center p-8">
                <div className={"relative h-1/2 w-full"}>
                    <Image src={sectionData[activeSection - 1]?.image} alt={sectionData[activeSection - 1]?.title}
                           objectFit={"cover"}
                           sizes={"100"}
                           fill={true}
                            />
                </div>
            </div>
        </div>
    )
}


const MobileSection = ({sectionData}: {sectionData: any}) => {
    return (
        <div  className={"w-full h-fit block"}>
            {sectionData.map((section,index) => (
                <div className={"min-h-svh h-auto mb-12 w-full"}>
                    <div className={"relative w-full h-auto aspect-square"}>
                        <Image src={section.image} alt={section.title} fill={true} />
                    </div>
                    <CardContent2 index={index+1}
                                  total={sectionData.length}
                                  title={section.title} tabs={section.tabs}  />
                </div>
            ))}
        </div>
    );
};


// Page export
export default function Example5() {
    const isDesktop = useMediaQuery({query: "(min-width: 728px)"})
    const sectionData = [
        {
            id: 1,
            title: "Recent Contacts",
            description: "These are your most recent contacts.",
            icon: <Clock className="h-6 w-6 text-primary/60"/>,
            image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
            tabs: [
                {title:"title 1", description:"description 1"},
                {title:"title 2", description:"description 2"},
                {title:"title 3", description:"description 3"},
                {title:"title 4", description:"description 4"},
                {title:"title 5", description:"description 5"}
            ]
        },
        {
            id: 1,
            title: "Recent Contacts",
            description: "These are your most recent contacts.",
            icon: <Clock className="h-6 w-6 text-primary/60"/>,
            image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
            tabs: [
                {title:"title 1", description:"description 1"},
                {title:"title 2", description:"description 2"},
                {title:"title 3", description:"description 3"},
                {title:"title 4", description:"description 4"},
                {title:"title 5", description:"description 5"}
            ]
        },
        // {
        //     id: 2,
        //     title: "Favorite Contacts",
        //     description: "Your favorite contacts.",
        //     image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
        //     icon: <div className="text-2xl">❤️</div>,
        //     content: (
        //         <p>
        //             During the wireframing phase, we create structural blueprints. This outlines layout, user flow, and
        //             interface elements before detailed design.
        //         </p>
        //     ),
        // },
        // {
        //     id: 3,
        //     title: "Other Contacts",
        //     description: "Other miscellaneous contacts.",
        //     image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
        //     icon: <User className="h-6 w-6 text-muted-foreground"/>,
        //     content: (
        //         <p>
        //             The content phase focuses on developing messaging and visual assets, ensuring everything aligns with
        //             brand and project goals.
        //         </p>
        //     ),
        // },
    ]

    return (
        <main className="container mx-auto flex  min-h-screen flex-col items-center justify-between">
            {isDesktop ? (<ScrollableSection sectionData={sectionData}/>) : (<MobileSection sectionData={sectionData}/>)}
        </main>
    )
}
