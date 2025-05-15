'use client';

import { useAuth } from '@/app/auth/auth-provider';
import { useRouter, usePathname } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import './auth.css';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/app/auth/component/app-sidebar";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Skip protection for the login page itself
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      // Redirect to login page with the current path for redirecting back after login
      const encodedRedirect = encodeURIComponent(pathname || '/login');
      router.push(`/login?redirect=${encodedRedirect}`);
    }
  }, [isAuthenticated, isLoading, router, isLoginPage, pathname]);

  // Show loading state
  if (isLoading) {
    return <div className="auth-loading">Loading authentication state...</div>;
  }

  // Allow login page access regardless of auth state
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protect all other /auth/* routes
  if (!isAuthenticated) {
    // Will redirect in useEffect, show nothing or loading
    return <div className="auth-redirect">Redirecting to login...</div>;
  }

  // User is authenticated, render the protected content
  return <div className="w-svw">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className={"p-12"}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>;
}
