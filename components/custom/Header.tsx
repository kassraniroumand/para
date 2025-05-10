"use client"
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
import {ArrowUpRight} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {HomePageState, useHomePageStore, usePortfolioPageStore} from "@/app/store/useHomePageStore";

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
                    badge = {text: "New", variant: "orange"},
                    href = "https://kokonutui.com/",
                }: Card08Props) {
    return (
        <Link href={href} className="block w-full h-full group">
            <div
                className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "dark:bg-zinc-900/80",
                    "shadow-xs",
                    "transition-all duration-300",
                    "hover:shadow-md",
                    "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
                )}
            >
                <div className="relative w-full h-[37svh] sm:h-[35svh] aspect-square overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className={cn("absolute inset-0", "bg-linear-to-t from-black/90 via-black/40 to-transparent")}/>

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
                            <ArrowUpRight
                                className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300"/>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export function CarouselDemo() {
    const porfolioItems = usePortfolioPageStore((state) => state.portfolio?.portfolioPage.sections.sites)

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            className="w-screen h-full py-4 sm:py-4">
            <CarouselContent className="h-full">
                {porfolioItems?.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full">
                        <div className="h-full">
                            <div className="relative h-fit">
                                <div className={"relative w-full h-full rounded-xl overflow-hidden"}>
                                    <Card08
                                        title={item.title}
                                        subtitle={item.description[0]}
                                        image={item.image}
                                        href={item.link}
                                    />
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

export default function Header() {

    const homepage = useHomePageStore((state) => state.homepage);

    return (
        <main className="flex flex-col items-center justify-center ">
            <section className="h-[60svh] flex flex-col items-center justify-center">
                {/* Heading - Different layouts for mobile and desktop */}
                <h1 className="font-bold tracking-tight text-black mb-6">
                    {/* Mobile heading (stacked) */}
                    <span className="block text-3xl sm:text-4xl md:hidden">Design, Development &<br/>
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
                    {/*{homepage?.section.hero.description}*/}
                    {homepage?.homepage.sections.hero.description}
                </p>

                {/* Buttons - Stacked on mobile, side by side on desktop */}
                <div className="flex flex-row gap-4 justify-center ">
                    <Link
                        passHref={true}
                        // href="#work"
                        href="https://calendly.com/me-kassraniroumand/30min?month=2025-05&date=2025-05-14"
                        className="text-base px-8 flex flex-col justify-center items-center  rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                        Book A Free Call
                    </Link>
                    <a
                        href="/portfolio"
                        className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        View Work
                    </a>
                </div>
            </section>
            <div className={"h-auto w-full bg-black"}>
                <CarouselDemo/>
            </div>

        </main>
    )
}
