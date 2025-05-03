"use client"

import {ReactNode, useEffect, useRef, useState} from "react"
import {Circle, Clock, User} from "lucide-react"
import {useInView} from "framer-motion"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {useMediaQuery} from "react-responsive";
import Image from "next/image";
import {motion} from "framer-motion";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

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

    return (
        <>
            <div className="space-y-8 justify-center items-start flex flex-col w-full">
                <div className={"mt-4 w-full flex flex-col items-center sm:items-start justify-center"}>
                    <p className="text-gray-400 tracking-widest">PHASE 1 / 4</p>
                    <h1 className="text-6xl font-serif mt-4">Planning</h1>
                </div>

                <div className="w-full ">
                    <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
                        <div className="relative">
                            <TabsList className="w-full justify-center sm:justify-start h-auto bg-transparent p-0 mb-6">
                                <TabsTrigger
                                    value="account"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative px-4 py-2 h-10"
                                >
                                    Account
                                </TabsTrigger>
                                <TabsTrigger
                                    value="password"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative px-4 py-2 h-10"
                                >
                                    Password
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative px-4 py-2 h-10"
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            {/* Animated underline */}
                            <motion.div
                                className="absolute bottom-0 h-0.5 bg-primary"
                                animate={{
                                    left: activeTab === "account" ? "0%" : activeTab === "password" ? "12.33%" : "26.66%",
                                    width: "12.33%",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        </div>

                        <TabsContent value="account" className="p-6 border rounded-lg">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Account Settings</h3>
                                <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </label>
                                        <input id="name" type="text" className="w-full p-2 border rounded-md" placeholder="Your name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <input id="email" type="email" className="w-full p-2 border rounded-md" placeholder="Your email" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="password" className="p-6 border rounded-lg">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Password Settings</h3>
                                <p className="text-sm text-muted-foreground">Update your password and security preferences.</p>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="current" className="text-sm font-medium">
                                            Current Password
                                        </label>
                                        <input id="current" type="password" className="w-full p-2 border rounded-md" placeholder="••••••••" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="new" className="text-sm font-medium">
                                            New Password
                                        </label>
                                        <input id="new" type="password" className="w-full p-2 border rounded-md" placeholder="••••••••" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="p-6 border rounded-lg">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">General Settings</h3>
                                <p className="text-sm text-muted-foreground">Configure your application preferences.</p>
                                <div className="grid gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input id="notifications" type="checkbox" className="h-4 w-4" />
                                        <label htmlFor="notifications" className="text-sm font-medium">
                                            Enable notifications
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input id="marketing" type="checkbox" className="h-4 w-4" />
                                        <label htmlFor="marketing" className="text-sm font-medium">
                                            Receive marketing emails
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>

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


const MobileSection = () => {
    return (
        <div  className={"w-full h-fit block"}>
            {sectionData.map((section) => (
                <div className={"min-h-svh h-auto mb-12 w-full"}>
                    <div className={"relative w-full h-auto aspect-square"}>
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
