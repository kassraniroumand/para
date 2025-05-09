import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash2} from "lucide-react";
import {useFormContext} from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import {useFieldArray} from "react-hook-form";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {z} from "zod";

import React, {useEffect} from 'react';
import ImageUploader from "@/components/ui/image-uploader";
import Image from "next/image";

const ServicesDetailForm = ({serviceIndex}: { serviceIndex: number }) => {
    const {control} = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: `homepage.sections.services.${serviceIndex}.services`,
    });

    return (
        <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
                <h3 className="font-medium">Service Details</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({
                        title: "",
                        description_1: "",
                        description_2: "",
                    })}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Detail
                </Button>
            </div>

            {fields.map((field, detailIndex) => (
                <Card key={field.id} className="mb-4">
                    <CardContent className="pt-4 space-y-4">
                        <FormField
                            control={control}
                            name={`homepage.sections.services.${serviceIndex}.services.${detailIndex}.title`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Detail Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={control}
                            name={`homepage.sections.services.${serviceIndex}.services.${detailIndex}.description_1`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description 1</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`homepage.sections.services.${serviceIndex}.services.${detailIndex}.description_2`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description 2</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(detailIndex)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Detail
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};


export default function ServicesForm() {
    const {control, watch} = useFormContext();

    const {fields: fieldsService, append, remove: fieldsRemove} = useFieldArray({
        control,
        name: "homepage.sections.services"
    });

    const appendService = () => {
        append({
            serviceTitle: "",
            serviceImage: "",
            serviceDescription_1: "",
            serviceDescription_2: "",
            serviceTitle_2: "",
            serviceDescription_3: "",
            serviceDescription_4: "",
        });
    }

    return (
        <div className="space-y-6 py-4">
            <Card className={"shadow-none border-0"}>
                <CardHeader>
                    <div className={"flex flex-row justify-between items-center"}>
                        <h1 className={"font-bold text-3xl"}>
                            Services
                        </h1>
                        <Button type={"button"} className={"flex flex-row"} onClick={() => appendService()}>
                            <PlusCircle/>
                            <p>Add Service</p>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
                        {fieldsService.map((service, index) => (
                            <Card className={"shadow-none border-0"} key={index}>
                                <CardContent>
                                    <div className={"flex flex-col gap-6"}>
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.services.${index}.serviceTitle`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>service title</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={""}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            <FormField
                                                control={control}
                                                name={`homepage.sections.services.${index}.serviceImage`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>service title</FormLabel>
                                                        <FormControl>
                                                            <ImageUploader value={field.value} onChange={field.onChange} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <div className={"relative w-full aspect-square"}>
                                                {watch(`homepage.sections.services.${index}.serviceImage`) && (
                                                    <Image
                                                        objectFit={"cover"}
                                                        src={watch(`homepage.sections.services.${index}.serviceImage`)} alt={"title"} fill={true} sizes={"100"} />
                                                )}
                                            </div>
                                        </div>
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.services.${index}.serviceDescription_1`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>service description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={""}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.services.${index}.serviceDescription_2`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>service description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={""}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.services.${index}.serviceTitle_2`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>service title 2</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={""}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.services.${index}.serviceDescription_3`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>service description 3</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={""}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`homepage.sections.services.${index}.serviceDescription_4`}
                                            render={({field}) => (
                                                <FormItem>
                                                   -
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={""}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <ServicesDetailForm serviceIndex={index}/>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type={"button"} onClick={() => fieldsRemove(index)}>
                                        remove service
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
