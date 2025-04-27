'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth/auth-provider';

export default function AuthIndexPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();


  return (
    <div className="auth-index-redirect">
      <h1>Auth Portal</h1>
      
    </div>
  );
}
