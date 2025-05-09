"use client"
import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import HeroForm from "./form-steps/HeroForm";
import TextScrollbarForm from "./form-steps/StatisticsForm";
import ServicesForm from "./form-steps/ServicesForm";
import FrameworkForm from "./form-steps/FrameworkForm";
import ProjectsForm from "./form-steps/ProjectsForm";
// import { HomepageData } from "@/types/homepage";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {toast} from "sonner";
import {apiClient} from "@/app/utils/api-client";
import {useHomePage} from "@/app/hooks/useHomePage";
import ProcessForm from "@/app/auth/pages/home-page/component/form-steps/ProcessForm";
import Advantage from "@/app/auth/pages/home-page/component/form-steps/advantage";
import {homepageSchema} from "@/app/auth/pages/home-page/schema";

const steps = ["hero", "statistics", "services", "process", "advantage", "framework"];

export default function MultiStepForm() {
    const {data: initialData, isLoading, error} = useHomePage();
    const [currentStep, setCurrentStep] = useState<string>("hero");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form with React Hook Form and zod validation
    const form = useForm<z.infer<typeof homepageSchema>>({
        // resolver: zodResolver(homepageSchema),
        defaultValues: initialData,
        mode: "onChange"
    });

    // Update form values if initialData changes
    useEffect(() => {
        if (initialData) {
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
        try {
            setIsSubmitting(true);

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

    const {formState: {errors}} = form;

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <Card className="w-full">
                        <CardContent>
                            <Tabs value={currentStep} className="w-full">
                                <TabsList className="grid grid-cols-9 w-full">
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
                                    <HeroForm/>
                                </TabsContent>

                                <TabsContent value="statistics">
                                    <TextScrollbarForm/>
                                </TabsContent>

                                <TabsContent value="services">
                                    <ServicesForm/>
                                </TabsContent>

                                <TabsContent value="process">
                                    <ProcessForm/>
                                </TabsContent>

                                <TabsContent value="advantage">
                                    <Advantage/>
                                </TabsContent>

                                <TabsContent value="framework">
                                    <FrameworkForm/>
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


                            <div className={"flex flex-row gap-4"}>
                                {currentStep !== steps[steps.length - 1] && (
                                    <Button variant={"secondary"} type="button" onClick={handleNext}>Next</Button>
                                )}
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
