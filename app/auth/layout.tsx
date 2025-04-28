'use client';

import { useAuth } from '@/app/auth/auth-provider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './auth.css';

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
  return <div className="auth-protected-layout">{children}</div>;
}
