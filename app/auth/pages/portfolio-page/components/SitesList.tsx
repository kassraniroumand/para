import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SiteItem } from "./SiteItem";
import { PlusCircle } from "lucide-react";

export const SitesList: React.FC = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolioPage.sections.sites",
  });

  const addSite = () => {
    append({
      title: "",
      link: "",
      category: "",
      description: [""],
      image: "",
      video: "",
      isFeatured: false,
      linkText: "View Project",
      tags: [],
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Portfolio Projects</h2>
        <Button
          type="button"
          onClick={addSite}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg border-muted-foreground/25">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <h3 className="text-lg font-medium">No projects added yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Add your first project to showcase your work. You can include images,
              descriptions, links, and more.
            </p>
            <Button
              type="button"
              onClick={addSite}
              variant="secondary"
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {fields.map((field, index) => (
            <SiteItem key={field.id} index={index} remove={() => remove(index)} />
          ))}
        </div>
      )}
    </div>
  );
};
