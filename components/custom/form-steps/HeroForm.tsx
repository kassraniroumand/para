import { HomepageData } from "@/types/homepage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import ImageUploader from "@/components/ui/image-uploader";
import Image from "next/image";

interface HeroFormProps {
  form: any; // Using any for simplicity, should ideally be properly typed
}

export default function HeroForm({ form }: HeroFormProps) {
  const { control } = useFormContext();

  return (
    <div className="space-y-6 py-4">
      <h3 className="text-lg font-medium">Hero Section</h3>

      <div className="space-y-4">
        <FormField
          control={control}
          name="homepage.hero.company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your company name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="homepage.hero.header"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Header</FormLabel>
              <FormControl>
                <Input
                  placeholder="Design, Development & Marketing for"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="homepage.hero.subheader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subheader</FormLabel>
              <FormControl>
                <Input
                  placeholder="Agencies, Startups & Solo Founders."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="homepage.hero.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="We assign our trained wizards to your project..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>CTA Buttons</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="homepage.hero.cta_buttons.0"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Book A Free Call"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="homepage.hero.cta_buttons.1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="View Recent Work"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel>As Seen On</FormLabel>
            <FormField
              control={control}
              name="homepage.hero.as_seen_on.title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-40"
                      placeholder="Section Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
          {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <FormField
                  control={control}
                  name={`homepage.hero.as_seen_on.brands.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={`Brand ${index + 1} Name`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`homepage.hero.as_seen_on.brands.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <ImageUploader value={field.value} onChange={field.onChange} />
                      {field.value && (
                        <Image
                          src={field.value}
                          alt={`Brand ${index + 1} Logo`}
                          width={100}
                          height={100}
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
