"use client"

import React, {useEffect} from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GeneralBlogSection from "@/app/auth/admin/blogs/component/fields/GeneralBlogSection";
import SeoBlogSection from "@/app/auth/admin/blogs/component/fields/SeoBlogSection";
import SocialBlogSection from "@/app/auth/admin/blogs/component/fields/SocialBlogSection";
import {Post, postInputType} from "@/app/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import TiptapEditor from "@/app/auth/admin/blogs/component/rich-text-editor";
import ContentBlogSection from "@/app/auth/admin/blogs/component/fields/ContentBlogSection";
import ImageBlogSection from "@/app/auth/admin/blogs/component/fields/ImageBlogSection";
import {useCreatePostMutation, useUpdatePostMutation} from "@/app/hooks/useBlog";
import {toast} from "sonner";



const PostMultiForm  = ({post}: {post:Post | null}) => {
    const form = useForm<postInputType>({
        defaultValues: {
            title: "",
            description: "",
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


    useEffect(()=>{
        form.reset({
            title: post?.title,
            description: post?.description,
            content: post?.content,
            isFeatured: post?.isFeatured,
            isPublished: post?.isPublished,
            categories: post?.categories?.map((c) => c.id) || [],
            tags: post?.tags?.map((c) => c.id) || [],
            seoKeywords: post?.seoKeywords?.map(c => c.id) || [],
            seoTitle: post?.seoTitle,
            seoDescription: post?.seoDescription,
            socialTitle: post?.socialTitle,
            socialDescription: post?.socialDescription,
            socialImageUrl: post?.socialImageUrl,
            image: post?.image,
            slug: post?.slug
        })
    },[post])

    const {mutateAsync: createPostMutation} = useCreatePostMutation();
    const {mutateAsync: updatePostMutation} = useUpdatePostMutation();
    const onSubmit = async (values: postInputType) => {
        try {
            console.log("Form submitted with values:", values);
            let res: null | Post = null;
            if (!post) {
                console.log("Creating new post");
                res = await createPostMutation(values);
            } else {
                console.log("Updating existing post with ID:", post.id);
                res = await updatePostMutation({id: post.id, data: values});

            }
            console.log("Post created/updated:", res);
            toast("Post created successfully", {
                description: "Your post has been created successfully."
            })
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
                                    <TabsTrigger value="image">Image</TabsTrigger>
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="social">Social</TabsTrigger>
                                    <TabsTrigger value="seo">Seo</TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <CardContent>
                                <TabsContent value="general">
                                    <GeneralBlogSection />
                                </TabsContent>
                                <TabsContent value="image">
                                    <ImageBlogSection />
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