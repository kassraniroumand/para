import {z} from "zod";

// Zod Schema for portfolio page
export const portfolioPageSchema = z.object({
    portfolioPage: z.object({
        sections: z.object({
            sites: z
                .array(
                    z.object({
                        id: z.string().optional(),
                        title: z.string().min(1, "Title is required"),
                        link: z.string().url("Invalid URL").min(1, "Link is required"),
                        category: z.string().min(1, "Category is required"),
                        description: z
                            .array(z.string().min(1, "Description item cannot be empty"))
                            .min(1, "At least one description item is required"),
                        image: z.string().min(1, "Image URL is required"),
                        video: z.string().url("Invalid URL").optional(),
                        isFeatured: z.boolean(),
                        linkText: z.string().min(1, "Link text is required"),
                        tags: z
                            .array(z.string().min(1, "Tag cannot be empty"))
                            .min(1, "At least one tag is required"),
                    })
                )
                .min(1, "At least one site is required"),
        }),
    }),
});
