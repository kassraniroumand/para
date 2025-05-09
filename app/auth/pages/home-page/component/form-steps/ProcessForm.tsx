import React from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash2} from "lucide-react";

const ProcessForm = () => {
    const {control, watch} = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: "homepage.sections.process.steps",
    });

    return (
        <Card className={"shadow-none border-0"}>
            <CardHeader>
                <div className={"flex flex-row justify-between items-center"}>
                    <h1 className={"font-bold text-3xl"}>
                        Process
                    </h1>
                </div>
            </CardHeader>
            <CardContent>
                <FormField
                    control={control}
                    name={`homepage.sections.process.title`}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Card className={"shadow-none border-0"}>
                    <CardHeader>
                        <div className={"flex flex-row justify-between items-center"}>
                            <h1 className={"font-bold text-3xl"}>
                                Steps
                            </h1>
                            <Button type={"button"} className={"flex flex-row"} onClick={() => append({
                                title: "",
                                description: "",
                            })}>
                                <PlusCircle/>
                                <p>Add Step</p>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className={"grid grid-cols-2 gap-5"}>
                        {fields.map((field, index) => (
                            <Card className={"shadow-none border-0 bg-neutral-50"} key={index}>
                                <CardContent>
                                    <div className={"grid grid-cols-1  gap-5"}>
                                        <FormField
                                            name={`homepage.sections.process.steps.${index}.title`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>title</FormLabel>
                                                    <FormControl>
                                                        <Input{...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`homepage.sections.process.steps.${index}.description`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>description</FormLabel>
                                                    <FormControl>
                                                        <Input{...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className={"flex justify-end"}>
                                    <Button type={"button"} variant={"destructive"} className={"flex flex-row "} onClick={()=>remove(index)}>
                                        <p>remove</p>
                                        <Trash2 />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
};

export default ProcessForm;