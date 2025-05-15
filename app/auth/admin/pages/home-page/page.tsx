import MultiStepForm from "@/app/auth/admin/pages/home-page/component/MultiStepForm";
import {QueryClient} from "@tanstack/query-core";
import {fetchHomePage} from "@/app/hooks/useHomePage";
import React from "react";

export default async function FormPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['homePage'],
    queryFn: fetchHomePage,
  });

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Home Page Management</h1>
        <p className="text-muted-foreground">
          Add and manage your portfolio projects. These will be displayed on your public portfolio page.
        </p>
      </div>
      <div>
        <MultiStepForm />
      </div>
    </div>
  );
}
