import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DescriptionFieldProps } from "../types";
import { PlusCircle, Trash2 } from "lucide-react";

export const DescriptionField: React.FC<DescriptionFieldProps> = ({ siteIndex }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `portfolioPage.sections.sites.${siteIndex}.description`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-base font-medium">Project Description</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Add Item</span>
        </Button>
      </div>

      <div className="space-y-3 px-0 py-2">
        {fields.length === 0 ? (
          <div className="flex items-center justify-center p-4 border border-dashed rounded-md border-muted-foreground/50">
            <p className="text-sm text-muted-foreground">Add description items to showcase project details</p>
          </div>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className="group flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium">
                {index + 1}
              </div>
              <FormField
                control={control}
                name={`portfolioPage.sections.sites.${siteIndex}.description.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1 mb-0">
                    <FormControl>
                      <Input
                        placeholder="Enter description item"
                        {...field}
                        className="border-muted focus-visible:ring-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
