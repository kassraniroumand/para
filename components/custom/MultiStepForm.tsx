import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroForm from "./form-steps/HeroForm";
import StatisticsForm from "./form-steps/StatisticsForm";
import ServicesForm from "./form-steps/ServicesForm";
import FrameworkForm from "./form-steps/FrameworkForm";
import ProjectsForm from "./form-steps/ProjectsForm";
// import { HomepageData } from "@/types/homepage";
import { apiClient } from "@/app/utils/api-client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { processFormImages } from "@/app/utils/image-helpers";
import { toast } from "sonner";

// Define the zod schema for validation
const homepageSchema = z.object({
  homepage: z.object({
    hero: z.object({
      header: z.string().min(1, "Header is required"),
      subheader: z.string().min(1, "Subheader is required"),
      description: z.string().min(1, "Description is required"),
      cta_buttons: z.array(z.string()),
      as_seen_on: z.object({
        title: z.string(),
        brands: z.array(z.object({
          image: z.string(),
          title: z.string()
        }))
      }),
      company_name: z.string().min(1, "Company name is required")
    }),
    statistics: z.object({
      statistics: z.array(z.object({
        value: z.string(),
        label: z.string()
      }))
    }),
    services: z.object({
      sectionTitle: z.string(),
      sectionSubtitle: z.string(),
      services: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        buttonText: z.string(),
        badge: z.string()
      }))
    }),
    framework: z.object({
      sectionTitle: z.string(),
      sectionSubtitle: z.string(),
      badge: z.string(),
      steps: z.array(z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional()
      }))
    }),
    projects: z.object({
      sectionTitle: z.string(),
      sectionDescription: z.string(),
      featuredProject: z.object({
        title: z.string(),
        image: z.string()
      }),
      projects: z.array(z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        src: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
        color: z.string().optional(),
        tags: z.array(z.object({value: z.string()})).optional()
      }))
    })
  })
});

type HomepageData = z.infer<typeof homepageSchema>

const INITIAL_DATA: HomepageData = {
  homepage: {
    hero: {
      header: "",
      subheader: "",
      description: "",
      cta_buttons: ["", ""],
      as_seen_on: {
        title: "As seen on",
        brands: [
          {image: "", title: ""},
          {image: "", title: ""},
          {image: "", title: ""},
        ]
      },
      company_name: ""
    },
    statistics: {
      statistics: [
        { value: "", label: "" },
        { value: "", label: "" },
        { value: "", label: "" },
        { value: "", label: "" }
      ]
    },
    services: {
      sectionTitle: "",
      sectionSubtitle: "",
      services: [
        {
          icon: "",
          title: "",
          description: "",
          buttonText: "",
          badge: ""
        }
      ]
    },
    framework: {
      sectionTitle: "",
      sectionSubtitle: "",
      badge: "",
      steps: []
    },
    projects: {
      sectionTitle: "",
      sectionDescription: "",
      featuredProject: {
        title: "",
        image: ""
      },
      projects: []
    }
  }
};

const steps = ["hero", "statistics", "services", "framework", "projects"];

export default function MultiStepForm({ initialData }: { initialData: any | null }) {
  const [currentStep, setCurrentStep] = useState<string>("hero");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with React Hook Form and zod validation
  const form = useForm<z.infer<typeof homepageSchema>>({
    resolver: zodResolver(homepageSchema),
    defaultValues: initialData || INITIAL_DATA,
    mode: "onChange"
  });

  // Update form values if initialData changes
  useEffect(() => {
    if (initialData) {
      console.log("Resetting form with data:", initialData);
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const onSubmit = async (data: z.infer<typeof homepageSchema>) => {
    // console.log(data);
    try {
      setIsSubmitting(true);
      // console.log(data);

      const response = await apiClient.post("/", data);

      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Error submitting form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Website Configuration</CardTitle>
              <CardDescription>
                Fill out the form to configure your website content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentStep} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  {steps.map((step) => (
                    <TabsTrigger
                      key={step}
                      value={step}
                      onClick={() => setCurrentStep(step)}
                      className="capitalize"
                    >
                      {step}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="hero">
                  <HeroForm form={form} />
                </TabsContent>

                <TabsContent value="statistics">
                  <StatisticsForm form={form} />
                </TabsContent>

                <TabsContent value="services">
                  <ServicesForm form={form} />
                </TabsContent>

                <TabsContent value="framework">
                  <FrameworkForm form={form} />
                </TabsContent>

                <TabsContent value="projects">
                  <ProjectsForm form={form} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === steps[0]}
              >
                Previous
              </Button>

              {currentStep !== steps[steps.length - 1] ? (
                <Button type="button" onClick={handleNext}>Next</Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
