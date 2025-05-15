import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AmplifyConfigProvider} from "@/app/auth/amplify-config";
import {AuthProvider} from "@/app/auth/auth-provider";
import NavBar from "@/components/custom/NavBar";
import ReactQueryProvider from "@/app/hooks/ReactQueryProvider";
import React from "react";
import {Toaster} from "@/components/ui/sonner";
import NavHeader from "@/components/custom/NavHeader";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Amplify Auth Demo",
    description: "Next.js app with AWS Amplify Authentication",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReactQueryProvider>
            <AmplifyConfigProvider>
                <AuthProvider>
                    <NavHeader/>
                    <div className={"mt-24"}>
                        {children}
                    </div>
                </AuthProvider>
            </AmplifyConfigProvider>
        </ReactQueryProvider>
        <Toaster position="top-right"/>
        </body>
        </html>
    );
}
