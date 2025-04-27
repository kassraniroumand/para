import React from 'react'
import StepDetail from '../components/custom/StepDetail'
import Head from 'next/head'

const ParallaxPage = () => {
  return (
    <>
      <Head>
        <title>Parallax Cards Demo</title>
        <meta name="description" content="Smooth scrolling parallax cards with Framer Motion" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Smooth Scroll Parallax
          </h1>
          <StepDetail />
        </div>
      </main>
    </>
  )
}

export default ParallaxPage
