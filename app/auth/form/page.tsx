"use client"

import { getHomePage } from "@/app/utils/serverAction";
import MultiStepForm from "@/components/custom/MultiStepForm"
import { HomepageData } from "@/types/homepage";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/utils/api-client";
import { useHomePage } from "@/app/hooks/useHomePage";

export default function FormPage() {
  const { data, isLoading, error } = useHomePage();

  console.log("Homepage data:", data);
  console.log("Loading:", isLoading);
  console.log("Error:", error);

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Website Content Management</h1>
          <p className="text-lg mb-10">Loading your website content...</p>

          <div className="max-w-4xl mx-auto p-4 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Website Content Management</h1>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error loading data</p>
            <p>There was a problem loading your website content. Using default values instead.</p>
          </div>

          <MultiStepForm initialData={null} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Website Content Management</h1>
        <p className="text-lg mb-10">Use this form to update your website content across all sections.</p>

        <MultiStepForm initialData={data} />
      </div>
    </div>
  );
}
