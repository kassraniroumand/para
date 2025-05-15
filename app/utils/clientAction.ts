import {apiClient, publicApiClient} from "@/app/utils/api-client";
import {
    Category,
    CategoryFormValues, CreateCategoryPayload, CreateSeoKeywordPayload, CreateTagPayload,
    GetBlogsParameter,
    HomepageData,
    PortfolioPage,
    PortfolioParameter, Post,
    postInputType,
    PostTypeValue, SeoKeyword, SeoKeywordFormValues, Tag, TagFormValues
} from "@/app/types";
import {apiClientBlog} from "@/app/utils/api-client-blog";

export async function getHomePageClient() : Promise<HomepageData> {
    const response = await publicApiClient.get("/")
    return response.data
}

export async function getPortfolioPageClient({isFeatured}: PortfolioParameter):  Promise<PortfolioPage> {
    try {
        const response = await apiClient.get(
            "/get-portfolio", {
                params: {
                    isFeatured: isFeatured
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}


// --------------------
// Posts
// --------------------
export const getPublishedBlogsClient = async (): Promise<Post[]> => {
    const response = await apiClientBlog.get("/posts_published");
    return response.data;
};

export const getAllPostsClient = async (): Promise<Post[]> => {
    const response = await apiClientBlog.get("/posts");
    return response.data;
};

export const getPostByIdClient = async (id: number): Promise<Post> => {
    const response = await apiClientBlog.get(`/posts/${id}`);
    return response.data;
};


export const createPostClient = async (post: postInputType): Promise<Post> => {
    const response = await apiClientBlog.post("/posts", post);
    return response.data;
};

export const updatePostClient = async ({
                                     id,
                                     data,
                                 }: {
    id: number;
    data: Partial<postInputType>;
}) => {
    const response = await apiClientBlog.put(`/posts/${id}`, data);
    return response.data;
};

export const deletePostClient = async (id: number): Promise<Post> => {
    const response = await apiClientBlog.delete(`/posts/${id}`);
    return response.data;
};

// --------------------
// Tags
// --------------------
export const getTagsClient = async (): Promise<Tag[]> => {
    const response = await apiClientBlog.get("/tags");
    return response.data;
};

export const createTagClient = async (tag: CreateTagPayload): Promise<Tag[]> => {
    const response = await apiClientBlog.post("/tags", tag);
    return response.data;
};

// --------------------
// Categories
// --------------------
export const getCategoriesClient = async (): Promise<Category[]> => {
    const response = await apiClientBlog.get("/categories");
    return response.data;
};

export const createCategoryClient = async (
    categories: CreateCategoryPayload
): Promise<CategoryFormValues> => {
    const response = await apiClientBlog.post("/categories", categories);
    console.log("response", response.data);
    return response.data;
};

// --------------------
// SEO Keywords
// --------------------
export const getSeoKeywordsClient = async (): Promise<SeoKeyword[]> => {
    const response = await apiClientBlog.get("/seo-keywords");
    return response.data;
};

export const createSeoKeywordClient = async (
    keyword: CreateSeoKeywordPayload
): Promise<SeoKeywordFormValues> => {
    const response = await apiClientBlog.post("/seo-keywords", keyword);
    return response.data;
};