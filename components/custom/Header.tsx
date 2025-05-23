"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { useHomePageStore } from "@/app/store/useHomePageStore"
import Projects from "@/components/custom/Projects"

export default function Header() {
    const homepage = useHomePageStore((state) => state.homepage)
    const ref = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "start center"],
    })

    const opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1])

    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    return (
        <main className="flex flex-col items-center justify-center mt-20 relative">
            {/* Hero Section */}
            <motion.section
                className="h-[80svh] sm:h-[60svh] flex flex-col items-center justify-center relative z-10 text-center px-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1 className="font-bold tracking-tight text-black mb-6" variants={itemVariants}>
          <span className="block text-3xl sm:text-4xl md:hidden">
            Design, Development &<br />
            Marketing for Agencies,
            <br />
            Startups & Solo Founders.
          </span>
                    <span className="hidden md:block md:text-5xl lg:text-6xl">
            Design, Development & Marketing for
            <br />
            Agencies, Startups & Solo Founders.
          </span>
                </motion.h1>

                <motion.p
                    className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12"
                    variants={itemVariants}
                >
                    {homepage?.homepage.sections.hero.description ||
                        "We help businesses create beautiful, functional digital experiences that drive growth and engagement."}
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={itemVariants}>
                    <Link
                        href="https://calendly.com/me-kassraniroumand/30min?month=2025-05&date=2025-05-14"
                        className="px-8 py-4 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                        aria-label="Book a free call"
                    >
                        Book A Free Call
                    </Link>
                    <Link
                        href="/portfolio"
                        className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        aria-label="View work portfolio"
                    >
                        View Work
                    </Link>
                </motion.div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                ref={ref}
                className="w-full flex text-white text-4xl font-bold z-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full relative">
                    {/* Content wrapper that determines the height */}
                    <div className="relative z-10 w-full container mx-auto">
                        <Projects />
                    </div>
                    {/* Background with opacity animation that matches content height */}
                    <motion.div style={{ opacity }} className="absolute top-0 left-0 w-full h-full bg-black z-0" />
                </div>
            </motion.section>
        </main>
    )
}
