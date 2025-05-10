"use client"

import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {portfolioPageSchema} from "@/app/auth/pages/portfolio-page/schema";
import {useCreatePortfolioPage, useGetPortfolioPage} from "@/app/hooks/usePortfolioPage";
import {toast} from "sonner";
import {Form} from "@/components/ui/form";
import {SitesList} from "@/app/auth/pages/portfolio-page/components/SitesList";
import {Button} from "@/components/ui/button";
import {Loader2, Save} from "lucide-react";
import React, {useEffect} from "react";
import {PortfolioPage} from "@/app/types";

const PortfolioForm = () => {
    const form = useForm<PortfolioPage>({
        defaultValues: {
            portfolioPage: {
                sections: {
                    sites: [],
                },
            },
        },
        resolver: zodResolver(portfolioPageSchema),
        mode: "onBlur",
    });

    const {mutateAsync, isPending, isSuccess} = useCreatePortfolioPage();
    const {data, isLoading, isError, error, refetch, isSuccess: GetPortfolioPageIsSuccess} = useGetPortfolioPage()

    useEffect(() => {
        form.reset(data)
    }, [data])


    const onSubmit = async (data: PortfolioPage) => {
        try {
            // Ensure there's at least one site
            if (data.portfolioPage.sections.sites.length === 0) {
                toast.error("Please add at least one project to your portfolio.");
                return;
            }


            // Submit data to server
            const response = await mutateAsync(data);
            await refetch()


        } catch (error) {
            console.error("Error saving portfolio:", error);
            toast.error("Failed to save your portfolio. Please try again.");
        }
    };

    useEffect(() => {
        if (GetPortfolioPageIsSuccess) toast.success("Your portfolio has been fetched successfully.");
     }, [GetPortfolioPageIsSuccess])

    return (
        <div>
            <div className="flex flex-col space-y-4 mb-10">
                <h1 className="text-3xl font-extrabold tracking-tight">Portfolio Management</h1>
                <p className="text-muted-foreground">
                    Add and manage your portfolio projects. These will be displayed on your public portfolio page.
                </p>
            </div>
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        <SitesList />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                size="lg"
                                className="gap-2"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4"/>
                                        Save Portfolio
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
};

export default PortfolioForm;