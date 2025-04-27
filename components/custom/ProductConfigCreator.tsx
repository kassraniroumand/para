"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Plus, Trash, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Schema for option values
const optionValueSchema = z.object({
  id: z.number(),
  value: z.string().min(1, "Value is required"),
  priceAdjustment: z.number().optional(),
})

// Schema for sub-options with lazy resolution
const subOptionSchema = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    required: z.boolean().default(false),
    triggerValue: z
      .object({
        id: z.number(),
        value: z.string(),
      })
      .optional(),
    values: z.array(optionValueSchema).min(1, "At least one value is required"),
    subOptions: z.array(subOptionSchema).optional(),
  })
)

// Schema for options
const optionSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  required: z.boolean().default(false),
  values: z.array(optionValueSchema).min(1, "At least one value is required"),
  subOptions: z.array(subOptionSchema).optional(),
})

// Schema for variants
const variantSchema = z.object({
  id: z.number(),
  sku: z.string().min(1, "SKU is required"),
  basePrice: z.number().min(0, "Base price must be 0 or greater"),
  image: z.string().url("Must be a valid URL").optional(),
  selectedValues: z.array(
    z.object({
      id: z.number(),
      value: z.string(),
    })
  ).min(1, "At least one selected value is required"),
})

// Schema for the entire product
const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Product name is required"),
  options: z.array(optionSchema).min(1, "At least one option is required"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

export function ProductConfigCreator() {
  const [result, setResult] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("options")
  const [allOptionValues, setAllOptionValues] = useState<{ id: number; value: string; optionName: string }[]>([])

  // Utility function to generate a new ID
  const getNewId = () => Math.floor(Math.random() * 1000) + 1

  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any, // Type cast to avoid TypeScript errors
    defaultValues: {
      id: getNewId(),
      name: "",
      options: [{
        id: getNewId(),
        name: "",
        required: false,
        values: [{ id: getNewId(), value: "" }],
        subOptions: []
      }],
      variants: [{
        id: getNewId(),
        sku: "",
        basePrice: 0,
        selectedValues: [{ id: 0, value: "" }]
      }],
    },
  })

  // Field arrays for options and variants
  const optionsArray = useFieldArray({
    control: form.control,
    name: "options",
  })

  const variantsArray = useFieldArray({
    control: form.control,
    name: "variants",
  })

  // Function to assign IDs to all elements in the form data
  const assignIds = (data: ProductFormValues): ProductFormValues => {
    // Auto-generate product ID if not present
    if (!data.id) data.id = getNewId();

    // Generate IDs for all options and nested values
    data.options = data.options.map(option => {
      // Set option ID
      option.id = option.id || getNewId();

      // Set IDs for values
      option.values = option.values.map(value => {
        value.id = value.id || getNewId();
        return value;
      });

      // Process sub-options recursively
      if (option.subOptions && option.subOptions.length > 0) {
        option.subOptions = processSubOptions(option.subOptions);
      }

      return option;
    });

    // Generate IDs for variants
    data.variants = data.variants.map(variant => {
      variant.id = variant.id || getNewId();
      return variant;
    });

    return data;
  };

  // Recursive function to process sub-options
  const processSubOptions = (subOptions: any[]): any[] => {
    return subOptions.map(subOption => {
      // Set sub-option ID
      subOption.id = subOption.id || getNewId();

      // Set IDs for values
      subOption.values = subOption.values.map((value: any) => {
        value.id = value.id || getNewId();
        return value;
      });

      // Process nested sub-options recursively
      if (subOption.subOptions && subOption.subOptions.length > 0) {
        subOption.subOptions = processSubOptions(subOption.subOptions);
      }

      return subOption;
    });
  };

  // Update allOptionValues when options change
  useEffect(() => {
    const updateOptionValues = () => {
      const values: { id: number; value: string; optionName: string }[] = [];

      // Function to collect all values from options and suboptions
      const collectValues = (options: any[], parentName: string = "") => {
        options.forEach(option => {
          if (!option.name) return;

          const optionName = parentName ? `${parentName} > ${option.name}` : option.name;

          if (option.values) {
            option.values.forEach((value: any) => {
              if (value.id && value.value) {
                values.push({
                  id: value.id,
                  value: value.value,
                  optionName: optionName
                });
              }
            });
          }

          if (option.subOptions && option.subOptions.length > 0) {
            collectValues(option.subOptions, optionName);
          }
        });
      };

      collectValues(form.getValues().options);
      setAllOptionValues(values);
    };

    // Initial update
    updateOptionValues();

    // Listen to form changes
    const subscription = form.watch((_, { name, type }) => {
      if (name?.startsWith('options') && type === 'change') {
        // Use setTimeout to avoid infinite update loops
        setTimeout(updateOptionValues, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Submit handler
  function onSubmit(data: ProductFormValues) {
    try {
      // Assign IDs to all elements
      const processedData = assignIds(data);

      const jsonResult = JSON.stringify(processedData, null, 2)
      setResult(jsonResult)
      toast.success("Product configuration created", {
        description: "JSON data is ready for use",
        duration: 3000,
      })
    } catch (error) {
      toast.error("Failed to create product configuration", {
        description: "There was an error processing your data",
        duration: 3000,
      })
    }
  }

  // Helper component for Option Values
  const ValuesFieldArray = ({ nestIndex, name }: { nestIndex: number; name: string }) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: `${name}.${nestIndex}.values` as any,
    })

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">Values</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ id: getNewId(), value: "" })}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Value
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3 items-start">
            <div className="flex-1 bg-muted/50 rounded p-2 text-xs text-muted-foreground">
              ID: {field.id}
            </div>
            <FormField
              control={form.control as any}
              name={`${name}.${nestIndex}.values.${index}.value` as any}
              render={({ field }) => (
                <FormItem className="flex-[2]">
                  <FormLabel className="sr-only">Value</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Value (e.g., Wood, Leather)" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name={`${name}.${nestIndex}.values.${index}.priceAdjustment` as any}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Price Adjustment</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Price Adj."
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? undefined : Number(e.target.value)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fields.length > 1 && remove(index)}
              disabled={fields.length <= 1}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    )
  }

  // Helper component for SubOptions
  const SubOptionsFieldArray = ({ nestIndex, parentName }: { nestIndex: number; parentName: string }) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: `${parentName}.${nestIndex}.subOptions` as any,
    })

    // Get parent values in a way that avoids the infinite loop
    const parentOption = form.getValues(`${parentName}.${nestIndex}`);
    const parentValues = parentOption?.values || [];

    return (
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">Sub Options</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({
              id: getNewId(),
              name: "",
              required: false,
              values: [{ id: getNewId(), value: "" }],
              subOptions: [],
            })}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Sub Option
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id} className="p-4 mt-2">
            <div className="flex gap-3 items-start">
              <div className="flex-1 bg-muted/50 rounded p-2 text-xs text-muted-foreground">
                ID: {field.id}
              </div>
              <FormField
                control={form.control as any}
                name={`${parentName}.${nestIndex}.subOptions.${index}.name` as any}
                render={({ field }) => (
                  <FormItem className="flex-[2]">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Sub option name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name={`${parentName}.${nestIndex}.subOptions.${index}.required` as any}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Required</FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3">
              <FormField
                control={form.control as any}
                name={`${parentName}.${nestIndex}.subOptions.${index}.triggerValue` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Value (Select parent value that shows this option)</FormLabel>
                    <Select
                      value={field.value ? `${field.value.id}:${field.value.value}` : ""}
                      onValueChange={(value) => {
                        if (!value) {
                          field.onChange(undefined);
                          return;
                        }
                        const [id, valueText] = value.split(':');
                        field.onChange({
                          id: Number(id),
                          value: valueText
                        });
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a trigger value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parentValues.map((value: any) => (
                          <SelectItem
                            key={value.id}
                            value={`${value.id}:${value.value}`}
                          >
                            {value.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This sub-option will only appear when the parent option has this value selected
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <ValuesFieldArray
              nestIndex={index}
              name={`${parentName}.${nestIndex}.subOptions`}
            />

            {/* Recursive SubOptions for deeper nesting */}
            <SubOptionsFieldArray
              nestIndex={index}
              parentName={`${parentName}.${nestIndex}.subOptions`}
            />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Configuration Creator</CardTitle>
          <CardDescription>
            Build your product options, attributes, and variants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control as any}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Custom Chair" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="options">Options</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                </TabsList>
                <TabsContent value="options" className="pt-4">
                  <Accordion type="multiple" defaultValue={['options-0']}>
                    {optionsArray.fields.map((field, index) => (
                      <AccordionItem key={field.id} value={`options-${index}`}>
                        <AccordionTrigger className="py-2">
                          <div className="flex items-center gap-2">
                            <span>Option: {field.name || `#${index + 1}`}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex gap-3 items-start">
                            <div className="flex-1 bg-muted/50 rounded p-2 text-xs text-muted-foreground">
                              ID: {field.id}
                            </div>
                            <FormField
                              control={form.control as any}
                              name={`options.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="flex-[2]">
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Material, Color, etc." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control as any}
                              name={`options.${index}.required`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-end space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel>Required</FormLabel>
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => optionsArray.fields.length > 1 && optionsArray.remove(index)}
                              disabled={optionsArray.fields.length <= 1}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>

                          <ValuesFieldArray nestIndex={index} name="options" />
                          <SubOptionsFieldArray nestIndex={index} parentName="options" />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="mt-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => optionsArray.append({
                        id: getNewId(),
                        name: "",
                        required: false,
                        values: [{ id: getNewId(), value: "" }],
                        subOptions: []
                      })}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="variants" className="pt-4">
                  <Accordion type="multiple" defaultValue={['variant-0']}>
                    {variantsArray.fields.map((field, index) => (
                      <AccordionItem key={field.id} value={`variant-${index}`}>
                        <AccordionTrigger className="py-2">
                          <div className="flex items-center gap-2">
                            <span>Variant: {field.sku || `#${index + 1}`}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 bg-muted/50 rounded p-2 text-xs text-muted-foreground">
                              ID: {field.id}
                            </div>
                            <FormField
                              control={form.control as any}
                              name={`variants.${index}.sku`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SKU</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="CHAIR-WOOD-OAK" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control as any}
                              name={`variants.${index}.basePrice`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Base Price</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" placeholder="249.99" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control as any}
                              name={`variants.${index}.image`}
                              render={({ field }) => (
                                <FormItem className="col-span-2">
                                  <FormLabel>Image URL</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="https://example.com/image.jpg" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Selected Values</h4>
                            <div className="space-y-3">
                              {form.watch(`variants.${index}.selectedValues`).map((_, vIndex) => (
                                <div key={vIndex} className="flex gap-3">
                                  <FormField
                                    control={form.control as any}
                                    name={`variants.${index}.selectedValues.${vIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormControl>
                                          <Select
                                            value={field.value?.id ? `${field.value.id}:${field.value.value}` : ""}
                                            onValueChange={(value) => {
                                              if (!value) return;
                                              const [id, valueText] = value.split(':');
                                              field.onChange({
                                                id: Number(id),
                                                value: valueText
                                              });
                                            }}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select an option value" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <div className="max-h-[200px] overflow-y-auto">
                                                {allOptionValues.map((opt) => (
                                                  <SelectItem
                                                    key={`${opt.id}-${opt.value}`}
                                                    value={`${opt.id}:${opt.value}`}
                                                  >
                                                    {opt.value} ({opt.optionName})
                                                  </SelectItem>
                                                ))}
                                              </div>
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      const values = form.getValues(`variants.${index}.selectedValues`)
                                      if (values.length > 1) {
                                        const newValues = [...values]
                                        newValues.splice(vIndex, 1)
                                        form.setValue(`variants.${index}.selectedValues`, newValues)
                                      }
                                    }}
                                    disabled={form.watch(`variants.${index}.selectedValues`).length <= 1}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const values = form.getValues(`variants.${index}.selectedValues`)
                                  form.setValue(`variants.${index}.selectedValues`, [
                                    ...values,
                                    { id: 0, value: "" }
                                  ])
                                }}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Selected Value
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => variantsArray.fields.length > 1 && variantsArray.remove(index)}
                              disabled={variantsArray.fields.length <= 1}
                            >
                              <Trash className="h-4 w-4 mr-1" /> Remove Variant
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="mt-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => variantsArray.append({
                        id: getNewId(),
                        sku: "",
                        basePrice: 0,
                        selectedValues: [{ id: 0, value: "" }]
                      })}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Variant
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <Button type="submit" className="w-full">Generate Product Configuration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Generated JSON</CardTitle>
            <CardDescription>Copy this JSON to use in your application</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-sm">
              {result}
            </pre>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(result)
                toast.success("Copied to clipboard")
              }}
            >
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
