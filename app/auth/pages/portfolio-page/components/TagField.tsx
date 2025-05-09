import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagFieldProps } from "../types";

export const TagField: React.FC<TagFieldProps> = ({ siteIndex, tagIndex }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={`portfolioPage.sections.sites.${siteIndex}.tags.${tagIndex}`}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2 m-0">
          <FormControl>
            <Input
              placeholder="Tag"
              {...field}
              className="w-32 h-8 rounded-full bg-primary/10 border-0 px-3 text-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
