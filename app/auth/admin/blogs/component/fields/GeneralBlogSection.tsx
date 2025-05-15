"use client"
import React, {useEffect, useState} from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import ImageUploader from "@/components/ui/image-uploader";
import slugify from "slugify";
import {Button} from '@/components/ui/button';
import Image from "next/image";
import {ListCollapse, X} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {useCategoriesQuery, useCreateCategoryMutation, useCreateTagMutation, useTagsQuery} from "@/app/hooks/useBlog";
import {useQueryClient} from "@tanstack/react-query";
import {MultiSelect, SelectItem} from "@/components/custom/multi-select";
import {Separator} from "@/components/ui/separator";

const GeneralBlogSection = () => {
    const {control, watch, setValue} = useFormContext(); // Fixed destructuring here
    const {data: tags, isLoading: tagLoading} = useTagsQuery();
    const {data: categories, refetch: categoryRefetch, isLoading: categoryLoading} = useCategoriesQuery();

    const {mutateAsync: categoryMutation} = useCreateCategoryMutation();
    const {mutateAsync: tagMutation} = useCreateTagMutation();

    const title = watch("title")

    useEffect(() => {
        if (title) {
            const slug = slugify(title, {
                lower: true,        // convert to lowercase
                strict: true,       // remove special characters
                trim: true,         // trim leading/trailing spaces
                locale: 'en',       // language code of your content
                // remove: /[*+~.()'"!:@]/g // additional characters to remove
            });
            setValue("slug", slug);
        }
    }, [title, setValue]);

    const queryClient = useQueryClient();

    const handleCategoryCreate = async (value: string) => {
        const newCategory2 = await categoryMutation({names: [value]});
        await categoryRefetch()
    }

    const handleTagMutation = async (value: string) => {
        const newTag = await tagMutation({names: [value]});
        await queryClient.invalidateQueries({ queryKey: ["tags"] })
    }

    const categoryItems = categories.map((item => ({label: item.name, value: item.id})));
    const tagItems = tags.map((item => ({label: item.name, value: item.id})));

    return (
        <Card className={"shadow-none border-0"}>
            <CardContent>
                <div className={"flex flex-col space-y-6"}>
                    <FormField
                        control={control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium capitalize">Title</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <ListCollapse className="h-4 w-4 text-muted-foreground"/>
                                        </div>
                                        <Input
                                            {...field}
                                            className="pl-10 bg-white dark:bg-black border-black/20 dark:border-white/20 transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:border-black dark:focus-visible:border-white"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium capitalize">description</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <ListCollapse className="h-4 w-4 text-muted-foreground"/>
                                        </div>
                                        <Input
                                            {...field}
                                            className="pl-10 bg-white dark:bg-black border-black/20 dark:border-white/20 transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:border-black dark:focus-visible:border-white"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="slug"
                        control={control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>URL Slug</FormLabel>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <ListCollapse className="h-4 w-4 text-muted-foreground"/>
                                    </div>
                                    <FormControl>
                                        <Input
                                            placeholder="slug-will-be-generated"
                                            {...field}
                                            className="pl-10 bg-white dark:bg-black border-black/20 dark:border-white/20 transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:border-black dark:focus-visible:border-white"
                                        />
                                    </FormControl>
                                </div>
                                <FormDescription>
                                    Human-readable URL identifier. Edit only if necessary.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                        <div>
                            <FormField
                                control={control}
                                name="categories"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium capitalize">Categories</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                isLoading={categoryLoading}
                                                items={categoryItems}
                                                select={field.value || []}
                                                onSelect={field.onChange}
                                                onCreate={handleCategoryCreate}
                                                placeholder="Select technologies..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium capitalize">Categories</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                isLoading={tagLoading}
                                                items={tagItems}
                                                select={field.value || []}
                                                onSelect={field.onChange}
                                                onCreate={handleTagMutation}
                                                placeholder="Select technologies..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Separator />
                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                        <FormField
                            control={control}
                            name="isFeatured"
                            render={({field}) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>Featured</FormLabel>
                                </FormItem>
                            )}
                        />

                        {/* isPublished */}
                        <FormField
                            control={control}
                            name="isPublished"
                            render={({field}) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>Published</FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

            </CardContent>

        </Card>
    );
};

export default GeneralBlogSection;