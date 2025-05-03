import { HomepageData } from "@/types/homepage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";

interface FrameworkFormProps {
  form: any; // Using any for simplicity, should ideally be properly typed
}

export default function FrameworkForm({ form }: FrameworkFormProps) {
  const { control } = useFormContext();

  // Use useFieldArray to handle dynamic framework steps
  const { fields, append, remove } = useFieldArray({
    control,
    name: "homepage.framework.steps"
  });

  const addStep = () => {
    append({
      title: "",
      description: "",
      icon: ""
    });
  };

  return (
    <div className="space-y-6 py-4">
      <h3 className="text-lg font-medium">Framework Section</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="homepage.framework.sectionTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Our 3-Step Winning Framework"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="homepage.framework.badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge Text</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Proven Framework"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="homepage.framework.sectionSubtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Subtitle</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A Simple 3-Step Process to Get Things Done"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium">Framework Steps</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStep}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Step
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md mb-4">
              <div className="flex justify-between items-start mb-4">
                <h5 className="text-sm font-medium">Step {index + 1}</h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`homepage.framework.steps.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Step Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`homepage.framework.steps.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="icon-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`homepage.framework.steps.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Step description..."
                        rows={2}
                        {...field || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
