import {z} from 'zod';

export const postSchema = z.object({
    pk: z.string(),
    sk: z.string(),
    type: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string().url().optional(),
    authorId: z.string(),
    createdAt: z.string(),
    gsi1pk: z.string(),
    gsi1sk: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
    socialTitle: z.string().optional(),
    socialDescription: z.string().optional(),
    socialImageUrl: z.string().optional(),
    slug: z.string(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean(),
    isPublished: z.boolean(),
})

