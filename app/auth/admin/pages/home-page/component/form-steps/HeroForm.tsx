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


export default function HeroForm() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <FormField
          control={control}
          name="homepage.sections.hero.company_name"
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
          name="homepage.sections.hero.header"
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
          name="homepage.sections.hero.subheader"
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
          name="homepage.sections.hero.description"
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

      </div>
    </div>
  );
}
