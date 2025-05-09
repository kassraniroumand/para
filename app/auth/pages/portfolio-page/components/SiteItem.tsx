import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ImageUploader from "@/components/ui/image-uploader";
import { SiteItemProps } from "../types";
import { TagField } from "./TagField";
import { DescriptionField } from "./DescriptionField";
import { Separator } from "@/components/ui/separator";

export const SiteItem: React.FC<SiteItemProps> = ({ index, remove }) => {
  const { control } = useFormContext();

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: `portfolioPage.sections.sites.${index}.tags`,
  });

  const image = useWatch({
    control,
    name: `portfolioPage.sections.sites.${index}.image`,
  });

  const title = useWatch({
    control,
    name: `portfolioPage.sections.sites.${index}.title`,
  });

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all">
      <CardHeader className="bg-muted/30">
        <CardTitle>{title || `Portfolio Item ${index + 1}`}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Title */}
            <FormField
              control={control}
              name={`portfolioPage.sections.sites.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} className="transition-all focus-within:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={control}
              name={`portfolioPage.sections.sites.${index}.category`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} className="transition-all focus-within:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* isFeatured */}
            <FormField
              control={control}
              name={`portfolioPage.sections.sites.${index}.isFeatured`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Project</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Mark this project as featured in your portfolio
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            {/* Image */}
            <FormField
              control={control}
              name={`portfolioPage.sections.sites.${index}.image`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Image</FormLabel>
                  <FormControl>
                    <ImageUploader value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {image && (
              <div className="relative h-40 overflow-hidden rounded-md">
                <Image
                  src={image}
                  alt="Project Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <Separator className="my-2" />

        {/* Description */}
        <DescriptionField siteIndex={index} />

        <Separator className="my-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Link */}
          <FormField
            control={control}
            name={`portfolioPage.sections.sites.${index}.link`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Link</FormLabel>
                <FormControl>
                  <Input placeholder="Project Link" {...field} className="transition-all focus-within:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Link Text */}
          <FormField
            control={control}
            name={`portfolioPage.sections.sites.${index}.linkText`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Link Text</FormLabel>
                <FormControl>
                  <Input placeholder="Link Button Text" {...field} className="transition-all focus-within:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Video */}
        <FormField
          control={control}
          name={`portfolioPage.sections.sites.${index}.video`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Video URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Project Video URL" {...field} className="transition-all focus-within:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-2" />

        {/* Tags */}
        <div className="space-y-4">
          <FormLabel className="text-base font-medium">Tags</FormLabel>
          <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-md">
            {tagFields.map((field, tagIndex) => (
              <div key={field.id} className="flex items-center">
                <TagField siteIndex={index} tagIndex={tagIndex} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTag(tagIndex)}
                  className="h-8 w-8 ml-1"
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTag("")}
              className="rounded-full"
            >
              + Add Tag
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/20 px-6 py-4 flex justify-between">
        <Button type="button" variant="destructive" size="sm" onClick={remove}>
          Remove Project
        </Button>
      </CardFooter>
    </Card>
  );
};
