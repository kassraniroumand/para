"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Our Blog", href: "/blogs" },
    // { label: "Contact", href: "#" },
    { label: "Login", href: "/login" },
  ]

  const serviceLinks = [
    { label: "Websites", href: "#" },
    { label: "eCommerce", href: "#" },
    { label: "Digital Marketing", href: "#" },
    { label: "WordPress", href: "#" },
    { label: "Branding", href: "#" },
    { label: "Mobile Apps", href: "#" },
    { label: "Digital Transformation", href: "#" },
  ]

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
      <>
        {/* Hamburger Button */}
        <button
            onClick={toggleMenu}
            className="z-40 p-2 focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Menu Panel */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  className="fixed inset-0 bg-black text-white z-50 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={toggleMenu} aria-label="Close menu">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <nav className="mt-16">
                    <ul className="space-y-6 text-2xl">
                      {mainLinks.map((link) => (
                          <motion.li key={link.label} variants={linkVariants}>
                            <Link
                                href={link.href}
                                className="block hover:text-gray-300 transition-colors"
                                onClick={(e) => {
                                  // e.preventDefault()
                                  toggleMenu()
                                }}
                            >
                              {link.label}
                            </Link>
                          </motion.li>
                      ))}
                    </ul>

                    <ul className="mt-8 space-y-4 text-sm text-gray-400">
                      {serviceLinks.map((link) => (
                          <motion.li key={link.label} variants={linkVariants}>
                            <a
                                href={link.href}
                                className="block hover:text-white transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  toggleMenu()
                                }}
                            >
                              {link.label}
                            </a>
                          </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  )
}
