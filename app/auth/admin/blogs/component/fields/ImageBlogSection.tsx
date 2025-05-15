import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import ImageUploader from "@/components/ui/image-uploader";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import slugify from "slugify";
import {Checkbox} from "@/components/ui/checkbox";
import {useFormContext} from "react-hook-form";

const ImageBlogSection = () => {
    const {control, watch, setValue} = useFormContext(); // Fixed destructuring here
    const image = watch("image")

    return (
        <Card className={"shadow-none border-0"}>
            <CardContent>
                <div className={"grid grid-cols-1"}>
                    <FormField
                        name={"image"}
                        control={control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUploader value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {image && (<div>{image}</div>)}
                    <div className={"relative w-full aspect-square"}>
                        {image && (
                            <Image src={"https://para-uploads-12345.s3.us-east-1.amazonaws.com/ChatGPT%20Image%20May%201%2C%202025%2C%2009_23_28%20PM%20%282%29.png"}
                                   alt={""}
                                   fill={true}
                                   sizes={"100"}
                            />
                        )}
                    </div>
                </div>
            </CardContent>

        </Card>
    );
};

export default ImageBlogSection;