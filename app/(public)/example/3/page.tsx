"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Lenis from 'lenis';
import { TabItem, UnderlinedTabs } from "./component/underlined-tabs";

const Section = ({ id, label, setActive } : {
    id: string
    label: string
    setActive: any
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    // Sample data for each section
    const getTabs = (sectionId: any) => {
        if (sectionId === "home") {
            return [
                {
                    value: "features",
                    label: "Features",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Key Features</h4>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Smooth scrolling experience</li>
                                <li>Responsive design for all devices</li>
                                <li>Interactive UI components</li>
                                <li>Modern visual aesthetics</li>
                            </ul>
                        </div>
                    ),
                },
                {
                    value: "benefits",
                    label: "Benefits",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Why Choose Us</h4>
                            <p>Our platform offers unmatched user experience with intuitive navigation and responsive design.</p>
                            <p>Get started in minutes with our simple onboarding process.</p>
                        </div>
                    ),
                },
                {
                    value: "testimonials",
                    label: "Testimonials",
                    content: (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="italic">"This platform changed how we do business. Highly recommended!"</p>
                                <p className="font-medium mt-2">- Sarah J., Marketing Director</p>
                            </div>
                        </div>
                    ),
                },
            ];
        } else if (sectionId === "about") {
            return [
                {
                    value: "mission",
                    label: "Our Mission",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Our Mission</h4>
                            <p>We strive to create innovative solutions that empower businesses and individuals alike.</p>
                            <p>Through cutting-edge technology and thoughtful design, we aim to solve real-world problems.</p>
                        </div>
                    ),
                },
                {
                    value: "team",
                    label: "Our Team",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Meet Our Experts</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-gray-200 mx-auto mb-2"></div>
                                    <p className="font-medium">Alex Chen</p>
                                    <p className="text-sm text-gray-500">CTO</p>
                                </div>
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-gray-200 mx-auto mb-2"></div>
                                    <p className="font-medium">Jamie Kim</p>
                                    <p className="text-sm text-gray-500">Design Lead</p>
                                </div>
                            </div>
                        </div>
                    ),
                },
                {
                    value: "history",
                    label: "History",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Our Journey</h4>
                            <div className="space-y-2">
                                <div className="flex">
                                    <div className="font-bold mr-4">2020:</div>
                                    <div>Founded with a vision to transform the industry</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold mr-4">2022:</div>
                                    <div>Expanded to international markets</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold mr-4">2024:</div>
                                    <div>Reached 1 million active users</div>
                                </div>
                            </div>
                        </div>
                    ),
                },
            ];
        } else if (sectionId === "contact") {
            return [
                {
                    value: "form",
                    label: "Contact Form",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Get In Touch</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Message</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        rows={3}
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    ),
                },
                {
                    value: "info",
                    label: "Contact Info",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Our Contact Details</h4>
                            <div className="space-y-2">
                                <p><span className="font-medium">Email:</span> contact@example.com</p>
                                <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
                                <p><span className="font-medium">Address:</span> 123 Business Ave, Tech City, 90210</p>
                            </div>
                        </div>
                    ),
                },
                {
                    value: "faq",
                    label: "FAQ",
                    content: (
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">Frequently Asked Questions</h4>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium">How quickly can I get a response?</p>
                                    <p className="text-gray-600">We typically respond within 24 hours during business days.</p>
                                </div>
                                <div>
                                    <p className="font-medium">Do you offer support on weekends?</p>
                                    <p className="text-gray-600">Limited support is available on weekends for urgent issues.</p>
                                </div>
                            </div>
                        </div>
                    ),
                },
            ];
        }
        return [];
    };

    // Create side content based on section
    const getSideContent = (sectionId: any) => {
        if (sectionId === "home") {
            return {
                title: "Latest Updates",
                content: (
                    <div className="space-y-4">
                        <div className="border-b pb-3">
                            <p className="font-medium">New Feature Release</p>
                            <p className="text-sm text-gray-600">Our latest update brings improved performance and new capabilities.</p>
                            <p className="text-xs text-gray-400 mt-1">April 28, 2025</p>
                        </div>
                        <div className="border-b pb-3">
                            <p className="font-medium">Community Spotlight</p>
                            <p className="text-sm text-gray-600">See how our users are creating amazing projects with our platform.</p>
                            <p className="text-xs text-gray-400 mt-1">April 22, 2025</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mt-2">
                            <h5 className="font-medium mb-2">Quick Stats</h5>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-center p-2 bg-white rounded-lg">
                                    <p className="text-xl font-bold text-blue-600">2.5M+</p>
                                    <p className="text-xs text-gray-500">Active Users</p>
                                </div>
                                <div className="text-center p-2 bg-white rounded-lg">
                                    <p className="text-xl font-bold text-blue-600">98%</p>
                                    <p className="text-xs text-gray-500">Satisfaction</p>
                                </div>
                            </div>
                        </div>
                        <button className="text-blue-600 text-sm font-medium mt-2">View all updates →</button>
                    </div>
                )
            };
        } else if (sectionId === "about") {
            return {
                title: "Company Values",
                content: (
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                1
                            </div>
                            <div>
                                <p className="font-medium">Innovation</p>
                                <p className="text-sm text-gray-600">We constantly push boundaries and explore new possibilities.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                2
                            </div>
                            <div>
                                <p className="font-medium">Quality</p>
                                <p className="text-sm text-gray-600">We never compromise on the quality of our products and services.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                3
                            </div>
                            <div>
                                <p className="font-medium">Community</p>
                                <p className="text-sm text-gray-600">We believe in building strong relationships with our users.</p>
                            </div>
                        </div>
                    </div>
                )
            };
        } else if (sectionId === "contact") {
            return {
                title: "Office Hours",
                content: (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p>Monday - Friday</p>
                                <p className="font-medium">9:00 AM - 6:00 PM</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Saturday</p>
                                <p className="font-medium">10:00 AM - 4:00 PM</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Sunday</p>
                                <p className="font-medium">Closed</p>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mt-4">
                            <p className="text-sm text-blue-800">Need urgent assistance? Use our 24/7 chat support available on the website.</p>
                        </div>
                    </div>
                )
            };
        }

        return { title: "", content: null };
    };

    const tabs = getTabs(id);
    const { title: sideContentTitle, content: sideContent } = getSideContent(id);

    useEffect(() => {
        if (inView) {
            setActive(id);
        }
    }, [inView, id, setActive]);

    return (
        <section
            ref={ref}
            id={id}
            className="h-screen flex items-center justify-center mb-4"
        >
            <div className="h-full sm:h-4/5 shadow-md w-full rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 sticky top-0 z-20">{label}</h2>
                <div className="flex-1 overflow-hidden">
                    <UnderlinedTabs
                        tabs={tabs}
                        defaultValue={tabs[0]?.value}
                        sideContentTitle={sideContentTitle}
                        sideContent={sideContent}
                        underlineClassName="after:bg-blue-500 after:h-0.5"
                        tabsListClassName="gap-2"
                        tabsTriggerClassName="font-medium"
                    />
                </div>
            </div>
        </section>
    );
};

export default function ScrollSectionsWithTabs() {
    const [activeSection, setActiveSection] = useState("home");

    // Initialize smooth scrolling with Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: any) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Handle navigation click
    const handleNavClick = (id: any) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sections = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact" }
    ];

    // Find the current section label
    const activeLabel = sections.find(section => section.id === activeSection)?.label || "";

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Floating title indicator for active section */}
            <div className="sticky top-4 mt-4 z-50 flex justify-center">
                <div className="bg-blue-600 text-white px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                    <h3 className="text-lg font-medium">
                        {activeLabel}
                    </h3>
                </div>
            </div>

            {/* Side navigation dots with labels that appear on hover */}
            <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
                <div className="flex flex-col items-center space-y-6">
                    {sections.map(({ id, label }) => (
                        <div key={id} className="group relative flex items-center">
                            <button
                                onClick={() => handleNavClick(id)}
                                aria-label={`Go to ${label} section`}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeSection === id
                                        ? "bg-blue-600 scale-150 shadow-md"
                                        : "bg-gray-400 hover:bg-gray-600"
                                }`}
                            />
                            <div className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="px-4 md:px-12 lg:px-24">
                {sections.map(({ id, label }) => (
                    <Section
                        key={id}
                        id={id}
                        label={label}
                        setActive={setActiveSection}
                    />
                ))}
            </div>
        </div>
    );
}