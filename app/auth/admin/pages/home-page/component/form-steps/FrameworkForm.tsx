import React from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {Card, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash2} from "lucide-react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import ImageUploader from "@/components/ui/image-uploader";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";

const FrameworkStepForm = ({ frameworkIndex }: { frameworkIndex: number }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name: `homepage.sections.framework.${frameworkIndex}.steps`,
        control
    });

    return (
        <Card className="shadow-none border-0">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Steps</h2>
                    <Button
                        type="button"
                        onClick={() => append({ title: "", description: "" })}
                        className="gap-2"
                    >
                        <PlusCircle size={16} />
                        Add Step
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field, stepIndex) => (
                    <Card key={field.id}>
                        <CardContent className="pt-6">
                            <div className="flex flex-col gap-4">
                                <FormField
                                    control={control}
                                    name={`homepage.sections.framework.${frameworkIndex}.steps.${stepIndex}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Step title" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`homepage.sections.framework.${frameworkIndex}.steps.${stepIndex}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Step description" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                type="button"
                                onClick={() => remove(stepIndex)}
                                variant="destructive"
                                className="gap-2"
                            >
                                <Trash2 size={16} />
                                Remove Step
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

const FrameworkForm = () => {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name: "homepage.sections.framework",
        control
    });

    return (
        <Card className="shadow-none border-0">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-3xl">Framework</h1>
                    <Button
                        type="button"
                        onClick={() => append({ title: "", description: "", image: "", steps: [] })}
                        className="gap-2"
                    >
                        <PlusCircle size={16} />
                        Add Framework Item
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field, index) => (
                    <Card key={field.id}>
                        <CardContent className="pt-6">
                            <Card className="shadow-none border-0 bg-muted/50">
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-4">
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.framework.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Framework title" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.framework.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Framework description" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.framework.${index}.image`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Image</FormLabel>
                                                    <FormControl>
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {watch(`homepage.sections.framework.${index}.image`) && (
                                            <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                                                <Image
                                                    src={watch(`homepage.sections.framework.${index}.image`)}
                                                    alt={watch(`homepage.sections.framework.${index}.title`) || "Framework image"}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        <Separator />
                                    </div>

                                    <div className="col-span-full">
                                        <FrameworkStepForm frameworkIndex={index} />
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="destructive"
                                className="gap-2"
                            >
                                <Trash2 size={16} />
                                Remove Framework
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

export default FrameworkForm;