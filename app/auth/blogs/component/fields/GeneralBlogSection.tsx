"use client"
import React, {useEffect} from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import ImageUploader from "@/components/ui/image-uploader";
import slugify from "slugify";
import {Button} from '@/components/ui/button';
import Image from "next/image";
import {X} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

const GeneralBlogSection = () => {
    const {control, watch, setValue} = useFormContext(); // Fixed destructuring here
    const title = watch("title")
    const image = watch("image")

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

    const categoriesField = useFieldArray({
        control,
        name: "categories",
    });

    const {fields:tagsField, append: tagsAppend, remove: tagsRemove } = useFieldArray({
        control,
        name: "tags",
    });

    return (
        <Card className={"shadow-none border-0"}>
            <CardContent>
                <FormField
                    name={"title"}
                    control={control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
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
                    <div className={"relative w-full aspect-square"}>
                        {image && (
                            <Image src={image}
                                   alt={""}
                                   fill={true}
                                   sizes={"100"}
                            />
                        )}
                    </div>
                </div>
                <FormField
                    name="slug"
                    control={control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>URL Slug</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        placeholder="slug-will-be-generated"
                                        {...field}
                                        className="pr-20" // make room for button
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 px-2"
                                    onClick={() => {
                                        if (title) {
                                            const newSlug = slugify(title, {lower: true, strict: true});
                                            setValue("slug", newSlug);
                                        }
                                    }}
                                >
                                    Regenerate
                                </Button>
                            </div>
                            <FormDescription>
                                Human-readable URL identifier. Edit only if necessary.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={"grid grid-cols-2"}>
                    <div>
                        <FormLabel>Categories</FormLabel>
                        {categoriesField.fields.map((field, index) => (
                            <FormField
                                key={field.id}
                                control={control}
                                name={`categories.${index}`}
                                render={({field}) => (
                                    <FormItem className="flex gap-2 items-center mt-2">
                                        <FormControl>
                                            <Input {...field} placeholder={`Category #${index + 1}`}/>
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => categoriesField.remove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="button" onClick={() => categoriesField.append("")}>
                            Add Category
                        </Button>
                    </div>
                    <div>
                        <FormLabel>Tags</FormLabel>
                        {tagsField.map((field, index) => (
                            <FormField
                                key={field.id}
                                control={control}
                                name={`tags.${index}`}
                                render={({ field }) => (
                                    <FormItem className="flex gap-2 items-center mt-2">
                                        <FormControl>
                                            <Input {...field} placeholder={`Tag #${index + 1}`} />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => tagsRemove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="button" onClick={() => tagsAppend("")} className="mt-2">
                            Add Tag
                        </Button>
                    </div>
                    <div>
                        <FormField
                            control={control}
                            name="isFeatured"
                            render={({ field }) => (
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
                            render={({ field }) => (
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