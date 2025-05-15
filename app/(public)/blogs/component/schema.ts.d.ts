import {z} from 'zod';


export const PostCreateDTOSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().url("Invalid URL").optional(),
    authorId: z.string().optional(),
    slug: z.string().optional(),
    categories: z.array(z.number()).optional(),
    tags: z.array(z.number()).optional(),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    // seo
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.number()).optional(),
    // social
    socialTitle: z.string().optional(),
    socialDescription: z.string().optional(),
    socialImageUrl: z.string().optional(),
});

export const postSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().url("Must be a valid URL").optional(),
    authorId: z.string().min(1, "Author is required"),
    slug: z.string().optional(),
    seoTitle: z.string().max(60, "SEO title should be under 60 characters").optional(),
    seoDescription: z.string().max(160, "SEO description should be under 160 characters").optional(),
    seoKeywords: z.array(z.number()).optional(),
    socialTitle: z.string().max(60, "Social title should be under 60 characters").optional(),
    socialDescription: z.string().max(160, "Social description should be under 160 characters").optional(),
    socialImageUrl: z.string().url("Must be a valid URL").optional(),
    categories: z.array(z.number()).min(1, "Select at least one category"),
    tags: z.array(z.number()).optional(),
    isFeatured: z.boolean().default(false),
    isPublished: z.boolean().default(false),
});

// Category schema
export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required").max(50, "Category name is too long"),
});

// Tag schema
export const tagSchema = z.object({
    name: z.string().min(1, "Tag name is required").max(50, "Tag name is too long"),
});

// SEO Keyword schema
export const seoKeywordSchema = z.object({
    name: z.string().min(1, "Keyword is required").max(50, "Keyword is too long"),
});


