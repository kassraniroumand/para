import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

interface StatisticsFormProps {
  form: any; // Using any for simplicity, should ideally be properly typed
}

export default function StatisticsForm({ form }: StatisticsFormProps) {
  const { control, watch } = useFormContext();
  const statistics = watch("homepage.statistics.statistics") || [];

  return (
    <div className="space-y-6 py-4">
      <h3 className="text-lg font-medium">Statistics Section</h3>

      <div className="space-y-4">
        {statistics.map((_, index) => (
          <div key={index} className="p-4 border rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`homepage.statistics.statistics.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statistic {index + 1} Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="233+"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`homepage.statistics.statistics.${index}.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statistic {index + 1} Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Websites Developed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
