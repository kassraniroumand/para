"use client"
import React from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ListCollapse, Tag, X} from "lucide-react";
import {usCreateSeoKeywordMutation, useSeoKeywordsQuery} from "@/app/hooks/useBlog";
import {MultiSelect} from "@/components/custom/multi-select";
import {useQueryClient} from "@tanstack/react-query";

const SeoBlogSection = () => {
    const queryClient = useQueryClient();
    const { control } = useFormContext(); // Fixed destructuring here
    const {data: seoKeywords, isLoading: seoKeywordLoading} = useSeoKeywordsQuery();
    const seoKeywordItems = seoKeywords?.map((item) => ({
        value: item.id,
        label: item.name,
    })) || [];

    const {mutateAsync: seoMutation} = usCreateSeoKeywordMutation();

    const handleSeoMutation = async (value: string) => {
        const newTag = await seoMutation({names: [value]});
        await queryClient.invalidateQueries({queryKey: ["seo-keywords"]});
    }

    return (
        <div className={"flex flex-col space-y-6"}>
            <FormField
                control={control}
                name="seoTitle"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium capitalize">seo Title</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <ListCollapse className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    {...field}
                                    className="pl-10 bg-white dark:bg-black border-black/20 dark:border-white/20 transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:border-black dark:focus-visible:border-white"
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="seoDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium capitalize">seo Description</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <ListCollapse className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    {...field}
                                    className="pl-10 bg-white dark:bg-black border-black/20 dark:border-white/20 transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:border-black dark:focus-visible:border-white"
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div>
                <div className={"grid grid-cols-3 gap-4"}>
                    <FormField
                        control={control}
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <MultiSelect
                                            isLoading={seoKeywordLoading}
                                            items={seoKeywordItems}
                                            select={field.value || []}
                                            onSelect={field.onChange}
                                            onCreate={handleSeoMutation}
                                            placeholder="Select technologies..."
                                        />
                                    </div>
                                </FormControl>

                            </FormItem>
                        )}
                        name={`seoKeywords`}
                    />
                </div>
            </div>
        </div>
    );
};

export default SeoBlogSection;