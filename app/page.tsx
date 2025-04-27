"use client"
import React from 'react'
import { useAuth } from './auth/auth-provider';
import Header from '@/components/custom/Header';
import SubHeaderBanner from '@/components/custom/SubHeader';
import ServicesBanner from '@/components/custom/ServicesBanner';
import StepService from '@/components/custom/StepService';
import StepDetail from '@/components/custom/StepDetail';
import Example1 from './(public)/example/1/page';
import Example2 from './(public)/example/2/page';

const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div >
      <Header />
      <SubHeaderBanner />
      <ServicesBanner />
      <StepService />
      <Example1 />
      <Example2 />

      {/* <StepDetail /> */}
    </div>
  )
}

export default App
