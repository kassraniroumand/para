'use client';

import { useAuth } from '@/app/auth/auth-provider';

export default function AuthDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="auth-dashboard">
      <h1>Auth Dashboard</h1>
      <p>Welcome to the protected Auth Dashboard! This page is only accessible when logged in.</p>

      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h2>Hello, {user?.username || 'User'}!</h2>
          <p>You've successfully accessed the protected auth section.</p>
        </div>

        <div className="dashboard-user-info">
          <h3>Your Profile</h3>
          {/*<UserProfile />*/}
        </div>

        <div className="dashboard-links">
          <h3>Protected Pages</h3>
          <ul>
            <li><a href="/auth/settings">Settings</a></li>
            <li><a href="/auth/profile">Profile Management</a></li>
            {user?.isAdmin && (
              <li><a href="/auth/admin">Admin Section</a></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
