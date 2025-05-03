"use client"

import {ReactNode, useEffect, useRef, useState} from "react"
import { Circle, Clock, Heart, User } from "lucide-react"
import { useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "react-responsive"
import { Avatar } from "@/components/ui/avatar"

// Improved contact data structure
const contactData = [
    {
        id: 1,
        title: "Recent Contacts",
        description: "People you've connected with lately.",
        icon: <Clock className="h-6 w-6 text-primary/60" />,
        contacts: [
            { name: "Alex Johnson", email: "alex@example.com", lastContact: "Today" },
            { name: "Maria Garcia", email: "maria@example.com", lastContact: "Yesterday" },
            { name: "Sam Taylor", email: "sam@example.com", lastContact: "2 days ago" }
        ]
    },
    {
        id: 2,
        title: "Favorite Contacts",
        description: "People you've marked as favorites.",
        icon: <Heart className="h-6 w-6 text-rose-500" />,
        contacts: [
            { name: "Taylor Wilson", email: "taylor@example.com", lastContact: "1 week ago" },
            { name: "Jordan Lee", email: "jordan@example.com", lastContact: "3 days ago" },
            { name: "Casey Morgan", email: "casey@example.com", lastContact: "Today" }
        ]
    },
    {
        id: 3,
        title: "Other Contacts",
        description: "Your complete contact directory.",
        icon: <User className="h-6 w-6 text-muted-foreground" />,
        contacts: [
            { name: "Robin Smith", email: "robin@example.com", lastContact: "2 weeks ago" },
            { name: "Jamie Brown", email: "jamie@example.com", lastContact: "1 month ago" },
            { name: "Quinn Adams", email: "quinn@example.com", lastContact: "3 weeks ago" }
        ]
    }
]

// Scroll-aware section component
const ScrollSection = ({ section, activeSection, setActiveSection, children } : {
    section: any,
    activeSection: any,
    setActiveSection: any,
    children: ReactNode
}) => {
    const ref = useRef(null)
    const inView = useInView(ref, { margin: "-50% 0px -50% 0px" })

    useEffect(() => {
        if (inView) setActiveSection(section.id)
    }, [inView, section.id, setActiveSection])

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

// Contact content component with tabs for different views
const ContactContent = ({ section }: {section : any}) => {
    const [activeTab, setActiveTab] = useState("all")

    // Filter contacts based on active tab
    const filteredContacts = section.contacts.filter((contact: any) => {
        if (activeTab === "all") return true
        if (activeTab === "recent") return ["Today", "Yesterday", "2 days ago"].includes(contact.lastContact)
        if (activeTab === "older") return !["Today", "Yesterday", "2 days ago"].includes(contact.lastContact)
        return true
    })

    return (
        <div className="w-full max-w-lg">
            <div className="space-y-8">
                <div>
                    <div className="flex items-center gap-3 text-gray-400 tracking-widest">
                        {section.icon}
                        <p className="uppercase text-sm font-medium">{section.title}</p>
                    </div>
                    <h1 className="text-4xl font-serif mt-4">Contact Directory</h1>
                    <p className="text-gray-500 mt-2">{section.description}</p>
                </div>

                <div className="border-b">
                    <div className="flex space-x-8">
                        <div className="relative pb-2">
                            <button
                                className={`font-medium transition-colors ${activeTab === "all" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                                onClick={() => setActiveTab("all")}
                            >
                                All
                            </button>
                            {activeTab === "all" && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></div>}
                        </div>
                        <div className="relative pb-2">
                            <button
                                className={`font-medium transition-colors ${activeTab === "recent" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                                onClick={() => setActiveTab("recent")}
                            >
                                Recent
                            </button>
                            {activeTab === "recent" && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></div>}
                        </div>
                        <div className="relative pb-2">
                            <button
                                className={`font-medium transition-colors ${activeTab === "older" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                                onClick={() => setActiveTab("older")}
                            >
                                Older
                            </button>
                            {activeTab === "older" && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></div>}
                        </div>
                    </div>
                </div>

                <div className="py-4 space-y-4">
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact: any, index: number) => (
                            <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-gray-500 font-medium">
                    {contact.name.split(' ').map((n: any) => n[0]).join('')}
                  </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{contact.name}</h3>
                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                </div>
                                <div className="text-xs text-gray-400">{contact.lastContact}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No contacts match your filter</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Contact detail card component
const ContactDetailCard = ({ section }: {section: any}) => {
    return (
        <Card className="p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <div className="text-xl font-semibold">{section.title}</div>
            </div>
            <Separator />
            <div className="text-muted-foreground mb-4">{section.description}</div>

            <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500">CONTACTS IN THIS GROUP</h3>
                {section.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.lastContact}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

// Main layout with scrollable sections
function ScrollableSection() {
    const [activeSection, setActiveSection] = useState(1)

    return (
        <div className="flex w-full">
            {/* Left Panel */}
            <div className="w-full md:w-1/2 border-r overflow-y-auto">
                {contactData.map((section) => (
                    <ScrollSection
                        key={section.id}
                        section={section}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    >
                        <ContactContent section={section} />
                    </ScrollSection>
                ))}
            </div>

            {/* Right Panel */}
            <div className="hidden md:flex w-1/2 sticky top-0 h-screen items-center justify-center p-8">
                <ContactDetailCard section={contactData[activeSection - 1]} />
            </div>
        </div>
    )
}

// Mobile view component
const MobileSection = () => {
    const [activeSection, setActiveSection] = useState(1)

    return (
        <div className="w-full px-4 py-8 space-y-8">
            {/* Section selector */}
            <div className="flex justify-between border rounded-lg p-1">
                {contactData.map((section) => (
                    <button
                        key={section.id}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                            activeSection === section.id
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {section.icon}
                            <span className="hidden sm:inline">{section.title}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Active section content */}
            <ContactContent section={contactData[activeSection - 1]} />
        </div>
    );
};

// Page export
export default function ContactViewer() {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

    return (
        <main className="mx-auto flex min-h-screen flex-col">
            {isDesktop ? <ScrollableSection /> : <MobileSection />}
        </main>
    )
}