import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/ui/image-uploader";
import Image from "next/image";


interface ProjectItemProps {
  index: number;
  remove: () => void;
}

export function ProjectItem({ index, remove }: ProjectItemProps) {
  const { control } = useFormContext();

  const image = useWatch({
    control,
    name: `homepage.projects.projects.${index}.image`,
  });

  const color = useWatch({
    control,
    name: `homepage.projects.projects.${index}.color`,
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag
  } = useFieldArray({
    control,
    name: `homepage.projects.projects.${index}.tags`,
  });

  return (
    <div className="p-4 border rounded-md mb-4">
      <div className="flex justify-between items-start mb-4">
        <h5 className="text-sm font-medium">Project {index + 1}</h5>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={remove}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField
          control={control}
          name={`homepage.projects.projects.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`homepage.projects.projects.${index}.image`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Image</FormLabel>
              <FormControl>
                <ImageUploader value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {image && (
        <Image
          src={image}
          alt={`Project ${index + 1} Image`}
          width={100}
          height={100}
          className="mb-4"
        />
      )}

      <FormField
        control={control}
        name={`homepage.projects.projects.${index}.description`}
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Project description..." rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`homepage.projects.projects.${index}.link`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`homepage.projects.projects.${index}.color`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Color</FormLabel>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-12 p-1 h-10 border rounded"
                />
                <Input
                  placeholder="#ffffff"
                  value={color}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <FormLabel>Tags</FormLabel>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => appendTag({ value: "" })}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Tag
            </Button>
          </div>
          {tagFields.map((tag, tagIndex) => (
          <div key={tag.id} className="flex items-center gap-2 mb-2">
            <FormField
              control={control}
              name={`homepage.projects.projects.${index}.tags.${tagIndex}.value`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="e.g. Landscape" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeTag(tagIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}



interface ProjectsFormProps {
  form: any;
}

export default function ProjectsForm({ form }: ProjectsFormProps) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "homepage.projects.projects",
  });

  const addProject = () => {
    append({
      title: "",
      description: "",
      src: "",
      image: "",
      link: "",
      color: "#ffffff",
    });
  };

  return (
    <div className="space-y-6 py-4">
      <h3 className="text-lg font-medium">Projects Section</h3>

      <div className="space-y-4">
        <FormField
          control={control}
          name="homepage.projects.sectionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Title</FormLabel>
              <FormControl>
                <Input placeholder="Photography Projects" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="homepage.projects.sectionDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This collection showcases exceptional photography projects..."
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-t pt-4 mb-6">
          <h4 className="text-md font-medium mb-4">Featured Project</h4>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="homepage.projects.featuredProject.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Matthias Leidinger" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="homepage.projects.featuredProject.image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <ImageUploader value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.watch("homepage.projects.featuredProject.image") && (
            <Image
              src={form.watch("homepage.projects.featuredProject.image")}
              alt="Featured Project"
              width={100}
              height={100}
              className="mt-2"
            />
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium">Project Items</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addProject}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Project
            </Button>
          </div>

          {fields.map((field, index) => (
            <ProjectItem
              key={field.id}
              index={index}
              remove={() => remove(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
