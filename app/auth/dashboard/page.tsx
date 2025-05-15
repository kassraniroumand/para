'use client';

import { useAuth } from '@/app/auth/auth-provider';
import {Button} from "@aws-amplify/ui-react";
import {useRouter} from "next/navigation";

export default function AuthDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, redirect
      router.push('/');


    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="auth-dashboard">
      <h1>Auth Dashboard</h1>
      <p>Welcome to the protected Auth Dashboard! This page is only accessible when logged in.</p>
      <Button onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
}
