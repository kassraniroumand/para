"use client";

import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';
import config from '@/amplify_outputs.json';

export function AmplifyConfigProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configure Amplify on the client side
    Amplify.configure(config, { ssr: true });
  }, []);

  return <>{children}</>;
}
