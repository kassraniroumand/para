// app/dashboard/layout.tsx


import TabsNav, {TabsNavigation} from "@/app/auth/admin/pages/TabsNav";
import React from "react";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const tabs = [
        {
            id: 'overview',
            title: 'Overview',
            href: '/auth/admin/pages',
            exact: true,
        },
        {
            id: 'portfolio',
            title: 'portfolio',
            href: '/auth/admin/pages/portfolio-page',
        },
        {
            id: 'home',
            title: 'home',
            href: '/auth/admin/pages/home-page',
        }
    ];

    return (
        <div className="p-4">
            <TabsNavigation tabs={tabs} className="mb-6" />
            <div>{children}</div>
        </div>
    );
}