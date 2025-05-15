import {Calendar, Home, Inbox, Search, Settings} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {useAuth} from "@/app/auth/auth-provider";



export function AppSidebar() {
    const {isAdmin} = useAuth();
    const data = isAdmin ?
        {
        versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],

        navMain: [
            {
                title: "Home",
                url: "/auth/admin/pages",
                items: []
            },
            {
                title: "Pages",
                url: "#",
                items: [
                    {
                        title: "Pages",
                        url: "/auth/admin/pages"
                    },
                ]
            },
            {
                title: "Blogs",
                url: "/auth/blog",
                items: [
                    {
                        title: "list",
                        url: "/auth/admin/blogs",
                    },
                    {
                        title: "Create",
                        url: "/auth/admin/blogs/create",
                    },
                ]
            },

        ],
    }
        :
        {
            navMain: [
                {
                    title: "Home",
                    url: "/auth",
                    items: []
                }
                ]
        }
    return (
        <Sidebar>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            {/*<SidebarContent>*/}
            {/*    <SidebarGroup>*/}
            {/*        <SidebarGroupLabel>Application</SidebarGroupLabel>*/}
            {/*        <SidebarGroupContent>*/}
            {/*            <SidebarMenu>*/}
            {/*                {items.map((item) => (*/}
            {/*                    <SidebarMenuItem key={item.title}>*/}
            {/*                        <SidebarMenuButton asChild>*/}
            {/*                            <Link href={item.url}>*/}
            {/*                                <item.icon />*/}
            {/*                                <span>{item.title}</span>*/}
            {/*                            </Link>*/}
            {/*                        </SidebarMenuButton>*/}
            {/*                    </SidebarMenuItem>*/}
            {/*                ))}*/}
            {/*            </SidebarMenu>*/}
            {/*        </SidebarGroupContent>*/}
            {/*    </SidebarGroup>*/}
            {/*</SidebarContent>*/}
        </Sidebar>
    )
}
