// "use client"
//
// import { useState, useEffect } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { toast } from "sonner"
//
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import productData from "@/app/(public)/test/productData.json"
//
// // Define the schema for the form based on product configuration
// const formSchema = z.object({
//   material: z.string({
//     required_error: "Please select a material",
//   }),
//   woodType: z.string().optional(),
//   finish: z.string().optional(),
// })
//
// // Define types for options state
// interface AvailableOptions {
//   woodType: boolean;
//   finish: boolean;
// }
//
// // Define types for product option values
// interface OptionValue {
//   id: number;
//   value: string;
//   priceAdjustment?: number;
// }
//
// // Define type for selected values
// interface SelectedValue {
//   id: number;
//   value: string;
// }
//
// export function ProductConfigForm() {
//   const [price, setPrice] = useState(productData.variants[0].basePrice)
//   const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
//   const [availableOptions, setAvailableOptions] = useState<AvailableOptions>({
//     woodType: false,
//     finish: false,
//   })
//   const [selectedVariant, setSelectedVariant] = useState<any>(null)
//
//   // Define form with zod resolver
//   const form = useForm<z.infer<typeof formSchema>>({
//     // resolver: zodResolver(formSchema),
//     defaultValues: {
//       material: "",
//       woodType: "",
//       finish: "",
//     },
//   })
//
//   // Watch for changes to the form values
//   const watchMaterial = form.watch("material")
//   const watchWoodType = form.watch("woodType")
//
//   // Update available options based on selection
//   useEffect(() => {
//     if (watchMaterial === "Wood") {
//       setAvailableOptions(prev => ({ ...prev, woodType: true }))
//     } else {
//       setAvailableOptions(prev => ({ ...prev, woodType: false, finish: false }))
//       form.setValue("woodType", "")
//       form.setValue("finish", "")
//     }
//   }, [watchMaterial, form])
//
//   // Update available options for finish based on wood type
//   useEffect(() => {
//     if (watchWoodType === "Oak") {
//       setAvailableOptions(prev => ({ ...prev, finish: true }))
//     } else {
//       setAvailableOptions(prev => ({ ...prev, finish: false }))
//       form.setValue("finish", "")
//     }
//   }, [watchWoodType, form])
//
//   // Calculate price adjustments
//   useEffect(() => {
//     let basePrice = productData.variants[0].basePrice
//     let priceAdjustments = 0
//
//     // Material adjustment
//     if (watchMaterial === "Leather") {
//       const leatherOption = productData.options[0].values.find(v => v.value === "Leather")
//       if (leatherOption?.priceAdjustment) {
//         priceAdjustments += leatherOption.priceAdjustment
//       }
//     }
//
//     // Wood type adjustment
//     if (watchMaterial === "Wood" && watchWoodType) {
//       const woodTypeOption = productData.options[0].subOptions[0].values.find(v => v.value === watchWoodType)
//       if (woodTypeOption?.priceAdjustment) {
//         priceAdjustments += woodTypeOption.priceAdjustment
//       }
//     }
//
//     // Finish adjustment
//     const finish = form.getValues("finish")
//     if (watchMaterial === "Wood" && watchWoodType === "Oak" && finish) {
//       const finishOption = productData.options[0].subOptions[0].subOptions[0].values.find(v => v.value === finish)
//       if (finishOption?.priceAdjustment) {
//         priceAdjustments += finishOption.priceAdjustment
//       }
//     }
//
//     // Find matching variant
//     const selectedValues: SelectedValue[] = []
//     if (watchMaterial) {
//       const materialValue = productData.options[0].values.find(v => v.value === watchMaterial)
//       if (materialValue) selectedValues.push({ id: materialValue.id, value: materialValue.value })
//     }
//     if (watchWoodType) {
//       const woodTypeValue = productData.options[0].subOptions[0].values.find(v => v.value === watchWoodType)
//       if (woodTypeValue) selectedValues.push({ id: woodTypeValue.id, value: woodTypeValue.value })
//     }
//     if (finish) {
//       const finishValue = productData.options[0].subOptions[0].subOptions[0].values.find(v => v.value === finish)
//       if (finishValue) selectedValues.push({ id: finishValue.id, value: finishValue.value })
//     }
//
//     // Find exact match in variants
//     const variant = productData.variants.find(v => {
//       // Check if all selected values match the variant
//       return selectedValues.every(selected =>
//         v.selectedValues.some(vs => vs.id === selected.id && vs.value === selected.value)
//       )
//     })
//
//     if (variant) {
//       setSelectedVariant(variant)
//       setPrice(variant.basePrice)
//     } else {
//       setSelectedVariant(null)
//       setPrice(basePrice + priceAdjustments)
//     }
//   }, [watchMaterial, watchWoodType, form])
//
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("values", values)
//     // Use Sonner toast instead of custom toast
//     toast.success("Configuration submitted", {
//       description: (
//         <div className="mt-2">
//           <p>Material: {values.material}</p>
//           {values.woodType && <p>Wood Type: {values.woodType}</p>}
//           {values.finish && <p>Finish: {values.finish}</p>}
//           <p className="font-bold mt-2">Price: ${price.toFixed(2)}</p>
//           {selectedVariant && <p>SKU: {selectedVariant.sku}</p>}
//         </div>
//       ),
//       duration: 5000,
//     })
//   }
//
//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>{productData.name}</CardTitle>
//         <CardDescription>Customize your chair</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="material"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Material</FormLabel>
//                   <FormControl>
//                     <div className="flex flex-col space-y-2">
//                       {productData.options[0].values.map((option) => (
//                         <label
//                           key={option.id}
//                           className={`flex items-center p-3 border rounded cursor-pointer ${
//                             field.value === option.value ? 'border-primary bg-primary/5' : 'border-gray-200'
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             className="sr-only"
//                             value={option.value}
//                             checked={field.value === option.value}
//                             onChange={() => field.onChange(option.value)}
//                           />
//                           <div className="ml-2">
//                             <p className="font-medium">{option.value}</p>
//                             {option.priceAdjustment && (
//                               <p className="text-sm text-gray-500">
//                                 +${option.priceAdjustment.toFixed(2)}
//                               </p>
//                             )}
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//
//             {availableOptions.woodType && (
//               <FormField
//                 control={form.control}
//                 name="woodType"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Wood Type</FormLabel>
//                     <FormControl>
//                       <div className="flex flex-col space-y-2">
//                         {productData.options[0].subOptions[0].values.map((option) => (
//                           <label
//                             key={option.id}
//                             className={`flex items-center p-3 border rounded cursor-pointer ${
//                               field.value === option.value ? 'border-primary bg-primary/5' : 'border-gray-200'
//                             }`}
//                           >
//                             <input
//                               type="radio"
//                               className="sr-only"
//                               value={option.value}
//                               checked={field.value === option.value}
//                               onChange={() => field.onChange(option.value)}
//                             />
//                             <div className="ml-2">
//                               <p className="font-medium">{option.value}</p>
//                               {option.priceAdjustment !== 0 && (
//                                 <p className="text-sm text-gray-500">
//                                   {option.priceAdjustment > 0 ? '+' : ''}${option.priceAdjustment.toFixed(2)}
//                                 </p>
//                               )}
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//
//             {availableOptions.finish && (
//               <FormField
//                 control={form.control}
//                 name="finish"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Finish</FormLabel>
//                     <FormControl>
//                       <div className="flex flex-col space-y-2">
//                         {productData.options[0].subOptions[0].subOptions[0].values.map((option) => (
//                           <label
//                             key={option.id}
//                             className={`flex items-center p-3 border rounded cursor-pointer ${
//                               field.value === option.value ? 'border-primary bg-primary/5' : 'border-gray-200'
//                             }`}
//                           >
//                             <input
//                               type="radio"
//                               className="sr-only"
//                               value={option.value}
//                               checked={field.value === option.value}
//                               onChange={() => field.onChange(option.value)}
//                             />
//                             <div className="ml-2">
//                               <p className="font-medium">{option.value}</p>
//                               {option.priceAdjustment !== 0 && (
//                                 <p className="text-sm text-gray-500">
//                                   {option.priceAdjustment > 0 ? '+' : ''}${option.priceAdjustment.toFixed(2)}
//                                 </p>
//                               )}
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//
//             <div className="py-2 text-lg font-medium">
//               Total Price: ${price.toFixed(2)}
//             </div>
//
//             <Button type="submit" className="w-full">
//               Add to Cart
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }
