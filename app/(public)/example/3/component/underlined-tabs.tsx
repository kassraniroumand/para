"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface TabItem {
    value: string
    label: React.ReactNode
    content: React.ReactNode
    disabled?: boolean
}

export interface UnderlinedTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
    tabs: TabItem[]
    defaultValue?: string
    underlineClassName?: string
    tabsListClassName?: string
    tabsTriggerClassName?: string
    tabsContentClassName?: string
    sideContentTitle?: string
    sideContent?: React.ReactNode
}

export function UnderlinedTabs({
                                   tabs,
                                   defaultValue,
                                   underlineClassName,
                                   tabsListClassName,
                                   tabsTriggerClassName,
                                   tabsContentClassName,
                                   sideContentTitle,
                                   sideContent,
                                   className,
                                   ...props
                               }: UnderlinedTabsProps) {
    const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.value)

    return (
        <div className="h-full w-full flex flex-col sm:grid sm:grid-cols-2 gap-6">
            <Tabs
                defaultValue={defaultValue || tabs[0]?.value}
                className={cn("h-full w-full flex flex-col", className)}
                onValueChange={setActiveTab}
                {...props}
            >
                <div className="border-b mb-4">
                    <TabsList className={cn("bg-transparent h-auto p-0", tabsListClassName)}>
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                disabled={tab.disabled}
                                className={cn(
                                    "px-4 py-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none relative transition-all",
                                    activeTab === tab.value
                                        ? cn(
                                            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary",
                                            underlineClassName,
                                        )
                                        : "text-muted-foreground hover:text-foreground",
                                    tabsTriggerClassName,
                                )}
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {tabs.map((tab) => (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className={cn("p-4 h-full border rounded-lg bg-white", tabsContentClassName)}
                    >
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>

            <div className="h-full flex flex-col border rounded-lg bg-white p-6">
                {sideContentTitle && (
                    <h3 className="text-lg font-medium mb-4">{sideContentTitle}</h3>
                )}
                {sideContent ? (
                    sideContent
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <p>Additional content can be displayed here</p>
                    </div>
                )}
            </div>
        </div>
    )
}