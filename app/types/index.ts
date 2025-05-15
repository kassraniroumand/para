import {z} from "zod";
import {portfolioPageSchema} from "@/app/auth/admin/pages/portfolio-page/schema";
import {
    frameworkSchema,
    frameworkSectionSchema, frameworkStepSchema, frameworkStepsSchema,
    homepageSchema
} from "@/app/auth/admin/pages/home-page/schema";
import {
    categorySchema,
    PostCreateDTOSchema,
    postSchema, seoKeywordSchema,
    tagSchema
} from "@/app/auth/admin/blogs/component/schema.ts";

export type PortfolioParameter = {
    isFeatured?: boolean;
}

export type GetBlogsParameter = {
    is_published? : boolean;
}

export type PortfolioPage = z.infer<typeof portfolioPageSchema>;
export type HomepageData = z.infer<typeof homepageSchema>;
export type servicesType = typeof homepageSchema.shape.homepage.shape.sections.shape.services
export type processType = typeof homepageSchema.shape.homepage.shape.sections.shape.process

export type FrameworkStep = z.infer<typeof frameworkStepSchema>;
export type FrameworkSection = z.infer<typeof frameworkSectionSchema>;
export type frameworkSteps = z.infer<typeof frameworkStepsSchema>;
export type FrameworkData = z.infer<typeof frameworkSchema>;

export type postInputType = z.infer<typeof PostCreateDTOSchema>;

// Types inferred from schemas
export type PostTypeValue = z.infer<typeof postSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
export type TagFormValues = z.infer<typeof tagSchema>;
export type SeoKeywordFormValues = z.infer<typeof seoKeywordSchema>;


interface BaseModel {
    id: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

// Post model
interface Post extends BaseModel {
    title: string;
    content: string;
    image: string;
    authorId: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    socialTitle: string;
    socialDescription: string;
    socialImageUrl: string;
    isFeatured: boolean;
    isPublished: boolean;
    seoKeywords: SeoKeyword[];
    categories: Category[];
    tags: Tag[];
}

export type CreateCategoryPayload = {
    names: string[];
};

export type CreateTagPayload = {
    names: string[];
};

export type CreateSeoKeywordPayload = {
    names: string[];
};


interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface SeoKeyword {
    id: number;
    name: string;
}

export type { Post, Category, Tag, SeoKeyword, BaseModel };
