"use client"

import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GeneralBlogSection from "@/app/auth/blogs/component/fields/GeneralBlogSection";
import SeoBlogSection from "@/app/auth/blogs/component/fields/SeoBlogSection";
import SocialBlogSection from "@/app/auth/blogs/component/fields/SocialBlogSection";
import {postInputType} from "@/app/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import TiptapEditor from "@/app/auth/blogs/component/rich-text-editor";
import ContentBlogSection from "@/app/auth/blogs/component/fields/ContentBlogSection";

// Define the schema and type in the same file for better maintainability
export const postInputSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().url("Invalid URL").optional(),
    authorId: z.string().optional(),
    slug: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    // seo
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
    // social
    socialTitle: z.string().optional(),
    socialDescription: z.string().optional(),
    socialImageUrl: z.string().optional(),
});


const PostMultiForm = () => {
    const form = useForm<postInputType>({
        defaultValues: {
            title: "",
            content: "",
            isFeatured: false,
            isPublished: false,
            categories: [],
            tags: [],
            seoKeywords: [],
        },
        // resolver: zodResolver(postInputSchema),
        mode: "onBlur"
    });

    const onSubmit = async (values: postInputType) => {
        try {
            console.log("Submitting:", values);
            // Add your actual submission logic here
            // await api.post('/posts', values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <div className=" mx-auto">
            <div className="flex flex-col space-y-4 mb-10">
                <h1 className="text-3xl font-extrabold tracking-tight">Portfolio Management</h1>
                <p className="text-muted-foreground">
                    Add and manage your portfolio projects. These will be displayed on your public portfolio page.
                </p>
            </div>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Tabs defaultValue="general">
                        <Card>
                            <CardHeader>
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="general">General</TabsTrigger>
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="social">Social</TabsTrigger>
                                    <TabsTrigger value="seo">Seo</TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <CardContent>
                                <TabsContent value="general">
                                    <GeneralBlogSection />
                                </TabsContent>
                                <TabsContent value="content">
                                    <ContentBlogSection />
                                </TabsContent>

                                <TabsContent value="seo">
                                    <SeoBlogSection />
                                </TabsContent>

                                <TabsContent value="social">
                                    <SocialBlogSection />
                                </TabsContent>
                            </CardContent>
                        </Card>


                    </Tabs>

                    <div className="flex justify-end">
                        <Button type="submit" className="mt-4">
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default PostMultiForm;