"use client"
import React from 'react';
import {usePathname} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface TabItem {
    id: string;
    title: string;
    href: string;
    exact?: boolean;
}

interface TabsNavigationProps {
    tabs: TabItem[];
    className?: string;
}

export function TabsNavigation({ tabs, className }: TabsNavigationProps) {
    const pathname = usePathname();

    const getCurrentTab = () => {
        // Check for exact matches first
        const exactMatch = tabs.find(tab =>
            tab.exact && pathname === tab.href
        );
        if (exactMatch) return exactMatch.id;

        // Check for partial matches
        const partialMatch = tabs.find(tab =>
            !tab.exact && (pathname === tab.href || pathname?.startsWith(`${tab.href}/`))
        );

        return partialMatch?.id || tabs[0]?.id;
    };

    const currentTab = getCurrentTab();

    return (
        <Tabs value={currentTab} className={cn('w-full', className)}>
            <TabsList className="flex w-full">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} asChild>
                        <Link
                            href={tab.href}
                            className={cn(
                                'w-full text-center',
                                currentTab === tab.id ? 'font-bold' : 'font-normal'
                            )}
                        >
                            {tab.title}
                        </Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

export default TabsNavigation;