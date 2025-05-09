import {z} from "zod";
import {portfolioPageSchema} from "@/app/auth/pages/portfolio-page/schema";
import {
    frameworkSchema,
    frameworkSectionSchema, frameworkStepSchema, frameworkStepsSchema,
    homepageSchema
} from "@/app/auth/pages/home-page/schema";

export type PortfolioParameter = {
    isFeatured?: boolean;
}

export type PortfolioPage = z.infer<typeof portfolioPageSchema>;
export type HomepageData = z.infer<typeof homepageSchema>;
export type servicesType = typeof homepageSchema.shape.homepage.shape.sections.shape.services
export type processType = typeof homepageSchema.shape.homepage.shape.sections.shape.process

export type FrameworkStep = z.infer<typeof frameworkStepSchema>;
export type FrameworkSection = z.infer<typeof frameworkSectionSchema>;
export type frameworkSteps = z.infer<typeof frameworkStepsSchema>;
export type FrameworkData = z.infer<typeof frameworkSchema>;