import { z } from "zod";


export const frameworkStepSchema = z.object({
    title: z.string(),
    description: z.string(),
});

export const frameworkStepsSchema = z.array(frameworkStepSchema)

export const frameworkSectionSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    steps: frameworkStepsSchema
});

export const frameworkSchema = z.array(frameworkSectionSchema);


export const homepageSchema = z.object({
    homepage: z.object({
        sections: z.object({
            hero: z.object({
                header: z.string().min(1, "Header is required"),
                subheader: z.string().min(1, "Subheader is required"),
                description: z.string().min(1, "Description is required"),
                company_name: z.string().min(1, "Company name is required")
            }),
            textScrollbar: z.object({
                text: z.string().min(1, "Text Scrollbar is required"),
            }),
            services: z.array(z.object({
                serviceTitle: z.string(),
                serviceImage: z.string(),
                serviceDescription_1: z.string(),
                serviceDescription_2: z.string(),
                serviceTitle_2: z.string(),
                serviceDescription_3: z.string(),
                serviceDescription_4: z.string(),
                services: z.array(z.object({
                    title: z.string(),
                    description_1: z.string(),
                    description_2: z.string(),
                }))
            })).min(1),
            process: z.object({
                title: z.string(),
                steps: z.array(z.object({
                    title: z.string().min(1, "Process is required"),
                    description: z.string().min(1, "Process is required"),
                }))
            }),
            advantage: z.array(z.object({
                title: z.string(),
                description: z.string(),
                image: z.string(),
                tags: z.array(z.object({
                    title: z.string(),
                }))
            })),
            framework: frameworkSchema
        })

    })
});
