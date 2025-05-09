'use client';

import { useAuth } from '@/app/auth/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from "next/link";

export default function AuthAdminPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/auth/dashboard');
    }
  }, [isAdmin, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return <div>Checking admin privileges...</div>;
  }

  // Guard against non-admin access
  if (!isAdmin) {
    return <div>Redirecting... Admin access required.</div>;
  }

  return (
    <div className="auth-admin-page">
      <h1>Admin Control Panel</h1>
      <p>Welcome, {user?.username}. This page is only accessible to administrators.</p>

      <Link href={"/auth/pages"}>
        Form
      </Link>

      <div className="admin-dashboard">
        <div className="admin-section">
          <h2>User Management</h2>
          <p>Here you would be able to manage users, permissions, and roles.</p>
          <button className="admin-button">Manage Users</button>
        </div>

        <div className="admin-section">
          <h2>System Configuration</h2>
          <p>Configure system settings and global parameters.</p>
          <button className="admin-button">System Settings</button>
        </div>

        <div className="admin-section">
          <h2>Analytics & Reports</h2>
          <p>View system analytics, usage reports, and statistics.</p>
          <button className="admin-button">View Reports</button>
        </div>
      </div>

      <div className="admin-actions">
        <button
          className="back-button"
          onClick={() => router.push('/auth/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
