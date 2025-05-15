"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import HamburgerMenu from "./NavBar"

export default function NavHeader() {
    const [isVisible, setIsVisible] = useState(true)
    const { scrollY } = useScroll()

    // Track scroll direction using Framer Motion
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()

        // Show header when:
        // 1. Scrolling up
        // 2. At the top of the page
        if (previous && latest < previous || latest < 50) {
            setIsVisible(true)
        }
        // Hide header when scrolling down and not at the top
        else if (previous && latest > 50 && latest > previous) {
            setIsVisible(false)
        }
    })

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
            }}
            className="fixed top-0 left-0 right-0 z-50 bg-black"
        >
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    <h1 className="text-xl font-bold text-white">Web London Hub</h1>
                    <div className="w-10"></div> {/* Spacer for balance */}
                    <HamburgerMenu />
                </div>
            </div>
        </motion.header>
    )
}
