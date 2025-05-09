import React from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash2} from "lucide-react";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import ImageUploader from "@/components/ui/image-uploader";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";


const AdvantageTag = ({advantageIndex}: { advantageIndex: number }) => {
    const {control} = useFormContext()

    const {fields, remove, append} = useFieldArray({
        control,
        name: `homepage.sections.advantage.${advantageIndex}.tags`,
    });


    return (
        <div>
            <div className={"flex flex-row justify-between gap-6 mb-4"}>
                <h1 className={"font-bold"}>Tags</h1>
                <Button type={"button"} onClick={() => append({
                    title: ""
                })}>
                    <div className="flex flex-row items-center gap-6">
                        <PlusCircle/>
                        <p>Add tag</p>
                    </div>
                </Button>
            </div>
            <div className={"flex flex-col gap-2 w-full"}>
                {fields.map((field, index) => (
                    <div className={"flex flex-row gap-2 w-full justify-between items-center"}>

                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-full text-black bg-neutral-200 text-sm font-bold">
                            5
                        </div>

                        <FormField
                            control={control}
                            name={`homepage.sections.advantage.${advantageIndex}.tags.${index}.title`}
                            render={({field}) => (
                                <FormItem className={"flex flex-row gap-4 w-full"}>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type={"button"} variant={"ghost"} onClick={() => remove(index)}>
                            <Trash2/>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Advantage = () => {
    const {control, watch} = useFormContext()
    const {fields, remove, append} = useFieldArray({
        control,
        name: "homepage.sections.advantage",
    });

    const appendAdvantage = () => {
        append({
            title: ``,
            description: ``,
            image: ``,
            tags: ['']
        })
    }


    return (
        <Card className={"shadow-none border-0"}>
            <CardHeader>
                <div className={"flex flex-row justify-between items-center"}>
                    <h1 className={"font-bold text-3xl"}>
                        Advantage
                    </h1>
                    <Button type={"button"} className={"flex flex-row"} onClick={() => appendAdvantage()}>
                        <PlusCircle/>
                        <p>Add Advantage</p>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className={"grid grid-cols-1 sm:grid-cols-2 gap-5"}>
                    {fields.map((field, index) => (
                        <Card key={index} className={"shadow-none border-0 bg-neutral-50 rounded-3xl"}>
                            <CardContent>
                                <div className={"flex flex-col gap-6"}>
                                    <FormField
                                        name={`homepage.sections.advantage.${index}.title`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name={`homepage.sections.advantage.${index}.description`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>description</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className={"flex flex-col w-full "}>
                                        <FormField
                                            name={`homepage.sections.advantage.${index}.image`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>image</FormLabel>
                                                    <FormControl>
                                                        <ImageUploader value={field.value} onChange={field.onChange}/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div className={"relative w-full aspect-video"}>
                                            {watch(`homepage.sections.advantage.${index}.image`) && (
                                                <Image
                                                    src={watch(`homepage.sections.advantage.${index}.image`)}
                                                    alt={"image"}
                                                    fill={true}
                                                    objectFit={"cover"}
                                                    sizes={"100"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <Separator/>
                                    <AdvantageTag advantageIndex={index}/>
                                </div>
                            </CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <Button variant={"destructive"} className={"flex flex-row "}
                                        onClick={() => remove(index)}>
                                    <p>remove</p>
                                    <Trash2/>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Advantage;