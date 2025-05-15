"use client"
import React from 'react';
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Captions, ListCollapse, Mail, User} from "lucide-react";

const SocialBlogSection = () => {
    const {control} = useFormContext(); // Fixed destructuring here
    return (
        <div className={"flex flex-col space-y-6"}>
            <FormField
                control={control}
                name="socialTitle"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium">social Title</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Captions className="h-4 w-4 text-muted-foreground"/>
                                </div>
                                <Input
                                    placeholder="John Doe"
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
                name="socialDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium">social Description</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <ListCollapse className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    placeholder="john.doe@example.com"
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
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            socialImageUrl
                        </FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                    </FormItem>
                )}
                name={"socialImageUrl"}
            />
        </div>
    );
};

export default SocialBlogSection;