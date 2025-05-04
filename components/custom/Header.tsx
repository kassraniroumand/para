"use client"
import {HomepageData} from "@/types/homepage";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Card, CardContent} from "@/components/ui/card"
import {ArrowUpRight} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";

const pros = [
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"
    },
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/ChatGPT%20Image%20May%201%2C%202025%2C%2009_23_28%20PM.jpg"
    },
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"
    },
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"
    },
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"
    },
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"
    },
    {
        title: "test1",
        description: "test1",
        image: "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp"
    }
]

interface Card08Props {
    title?: string
    subtitle?: string
    image?: string
    badge?: {
        text: string
        variant: "pink" | "indigo" | "orange"
    }
    href?: string
}

function Card08({
                                   title = "Modern Design Systems",
                                   subtitle = "Explore the fundamentals of contemporary UI design",
                                   image = "https://para-uploads-12345.s3.us-east-1.amazonaws.com/original-6d1d64057ad135b74acc165d79083f65.webp",
                                   badge = { text: "New", variant: "orange" },
                                   href = "https://kokonutui.com/",
                               }: Card08Props) {
    return (
        <Link href={href}  className="block w-full group">
            <div
                className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "bg-white/80 dark:bg-zinc-900/80",
                    "backdrop-blur-xl",
                    "border border-zinc-200/50 dark:border-zinc-800/50",
                    "shadow-xs",
                    "transition-all duration-300",
                    "hover:shadow-md",
                    "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
                )}
            >
                <div className="relative h-[320px] overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className={cn("absolute inset-0", "bg-linear-to-t from-black/90 via-black/40 to-transparent")} />

                <div className="absolute top-3 right-3">
          <span
              className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-medium",
                  "bg-white/90 text-zinc-800",
                  "dark:bg-zinc-900/90 dark:text-zinc-200",
                  "backdrop-blur-md",
                  "shadow-xs",
                  "border border-white/20 dark:border-zinc-800/50",
              )}
          >
            {badge.text}
          </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">{title}</h3>
                            <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">{subtitle}</p>
                        </div>
                        <div
                            className={cn(
                                "p-2 rounded-full",
                                "bg-white/10 dark:bg-zinc-800/50",
                                "backdrop-blur-md",
                                "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                                "transition-colors duration-300 group",
                            )}
                        >
                            <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export function CarouselDemo() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            className="w-screen h-full">
            <CarouselContent className="h-full">
                {pros.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 h-full">
                        <div className="h-full">
                            <div className="relative h-[40svh] ">
                                <div className={"relative w-full h-full rounded-xl overflow-hidden"}>
                                    <Card08 />
                                    {/*<div className={"z-40 text-white"}>*/}
                                    {/*    {item.title}*/}
                                    {/*</div>*/}
                                    {/*<Image*/}
                                    {/*    objectFit={"cover"}*/}
                                    {/*    src={item.image} alt={item.title} fill={true} sizes={"100"}/>*/}
                                    {/*<div className={"w-full z-10 h-full bg-black opacity-50 absolute top-0 left-0"}></div>*/}

                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10"/>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10"/>
        </Carousel>
    )
}

export default function Home({data}: { data: HomepageData['homepage']['hero'] }) {


    return (
        <main className="flex flex-col items-center justify-center bg-white">
            <section className="h-[60svh] flex flex-col items-center justify-center bg-white">
                {/* Heading - Different layouts for mobile and desktop */}
                <h1 className="font-bold tracking-tight text-black mb-6">
                    {/* Mobile heading (stacked) */}
                    <span className="block text-3xl sm:text-4xl md:hidden">
            Design, Development &<br/>
            Marketing for Agencies,
            <br/>
            Startups & Solo Founders.
          </span>

                    {/* Desktop heading (with different line breaks) */}
                    <span className="hidden md:block md:text-5xl lg:text-6xl">
            Design, Development & Marketing for
            <br/>
            Agencies, Startups & Solo Founders.
          </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 px-10">
                    We assign our trained wizards to your project who develop, design, and digitally market your
                    business. Hire us
                    and see the magic happen
                </p>

                {/* Buttons - Stacked on mobile, side by side on desktop */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-24 px-8 sm:px-0">
                    <a
                        href="#contact"
                        className="px-8 py-4 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                        Book A Free Call
                    </a>
                    <a
                        href="#work"
                        className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        View Recent Work
                    </a>
                </div>

                {/*<div className="mt-16">*/}
                {/*  <p className="text-gray-500 mb-10">As seen on</p>*/}

                {/*  /!* Mobile: 2x2 grid *!/*/}
                {/*  <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:hidden">*/}
                {/*    {data?.as_seen_on.brands.map((brand) => (*/}
                {/*        <div className="opacity-40">*/}
                {/*          <h1>{brand['title']}</h1>*/}
                {/*          <Image src={brand['image']} width={120} height={50} alt={"fdas"}/>*/}
                {/*          /!*<img src="/placeholder.svg?height=40&width=120" alt="Land-book" width={120} height={40} />*!/*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*    /!*<div className="opacity-40">*!/*/}
                {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="Land-book" width={120} height={40} />*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className="opacity-40">*!/*/}
                {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="Product Hunt" width={120} height={40} />*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className="opacity-40">*!/*/}
                {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="awwwards" width={120} height={40} />*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className="opacity-40">*!/*/}
                {/*    /!*  <img src="/placeholder.svg?height=40&width=120" alt="DESIGNMUNK" width={120} height={40} />*!/*/}
                {/*    /!*</div>*!/*/}
                {/*  </div>*/}

                {/*  /!* Desktop: Row *!/*/}
                {/*  <div className="hidden md:flex flex-wrap justify-center items-center gap-12">*/}
                {/*    {data?.as_seen_on.brands.map((brand) => (*/}
                {/*        <div className="opacity-70 hover:opacity-100 transition-opacity">*/}
                {/*          <h1>{brand['title']}</h1>*/}
                {/*          <Image src={brand['image']} width={120} height={40} alt={"fdas"}/>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*  </div>*/}
                {/*</div>*/}
            </section>

            <div className={"h-[40svh] w-full"}>
                <CarouselDemo/>
            </div>

        </main>
    )
}
