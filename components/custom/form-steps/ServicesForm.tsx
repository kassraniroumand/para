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

interface ServicesFormProps {
  form: any; // Using any for simplicity, should ideally be properly typed
}

export default function ServicesForm({ form }: ServicesFormProps) {
  const { control, watch } = useFormContext();

  // Use useFieldArray to handle dynamic service items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "homepage.services.services"
  });

  const addService = () => {
    append({
      icon: "",
      title: "",
      description: "",
      buttonText: "Learn More",
      badge: ""
    });
  };

  return (
    <div className="space-y-6 py-4">
      <h3 className="text-lg font-medium">Services Section</h3>

      <div className="space-y-4">
        <FormField
          control={control}
          name="homepage.services.sectionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Services"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="homepage.services.sectionSubtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Subtitle</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="We're the Secret Sauce to Your Digital Success..."
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
            <h4 className="text-md font-medium">Service Items</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addService}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Service
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md mb-4">
              <div className="flex justify-between items-start mb-4">
                <h5 className="text-sm font-medium">Service {index + 1}</h5>
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
                  name={`homepage.services.services.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`homepage.services.services.${index}.badge`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SEO & PPC"
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
                name={`homepage.services.services.${index}.title`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SEO & PPC"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`homepage.services.services.${index}.description`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="We're the Secret Sauce to Your Digital Success..."
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`homepage.services.services.${index}.buttonText`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Learn More"
                        {...field}
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
