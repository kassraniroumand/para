import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";

interface StatisticsFormProps {
  form: any; // Using any for simplicity, should ideally be properly typed
}

export default function StatisticsForm() {
  const { control, watch } = useFormContext();

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
          <FormField
              control={control}
              name="homepage.sections.textScrollbar.text"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>text</FormLabel>
                      <FormControl>
                          <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
              )}
          />
      </div>
    </div>
  );
}
