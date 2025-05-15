"use client"
import React from 'react';
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import TiptapEditor from "@/app/auth/admin/blogs/component/rich-text-editor";

const ContentBlogSection = () => {
    const { control } = useFormContext(); // Fixed destructuring here

    return (
        <Card className={"shadow-none border-0"}>
            <CardContent>
                <FormField
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <TiptapEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    name={field.name}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </CardContent>

        </Card>
    );
};

export default ContentBlogSection;