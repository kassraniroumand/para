"use client"
// Function to extract query options
import {
    getAllPosts,
    getCategories,
    getPublishedBlogs,
    getSeoKeywords,
    createCategory,
    createTag,
    createSeoKeyword,
    getTags, createPost, getPostById, updatePost, deletePost
} from "@/app/utils/serverAction";
import {
    CreateCategoryPayload,
    CreateTagPayload,
    GetBlogsParameter,
    PortfolioParameter,
    postInputType
} from "@/app/types";
import {useMutation, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {getAllPostsClient} from "@/app/utils/clientAction";


export const blogsOptions = () => ({
    queryKey: ['blogs'] as const,
    queryFn: () => getPublishedBlogs(),
    retry: 1,
    refetchOnWindowFocus: false,
});

export const useBlogs = (params: GetBlogsParameter = {}) => {
    const queryOptions = blogsOptions();
    return useSuspenseQuery(queryOptions)
};


export const useMutationIsPublished = () => {
    return useMutation({
        mutationKey: ['blogs'],
        mutationFn: async ({postId, data}: {postId: number, data:Partial<postInputType>}) => updatePost({id:postId, data})
    })
}

export const usePublishedBlogsQuery = () => {
    return useQuery({
        queryKey: ['posts', 'published'],
        queryFn: async () => getAllPosts(),
    });
};

export const useAllPostsQuery = () => {
    return useSuspenseQuery({
        queryKey: ['posts'],
        queryFn: async () => getAllPostsClient(),
    });
};

export const usePostByIdQuery = (id: number) => {
    return useSuspenseQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
    });
};

export const useCreatePostMutation = () => {
    return useMutation({
        mutationKey: ['create-post'],
        mutationFn: async (data: postInputType) => createPost(data),
    });
};

export const useUpdatePostMutation = () => {
    return useMutation({
        mutationKey: ['update-post'],
        mutationFn: async ({ id, data }: { id: number; data: Partial<postInputType> }) => {
            console.log("update post", id, data)
            return updatePost({ id, data });
        },
    });
};

export const useDeletePostMutation = () => {
    return useMutation({
        mutationKey: ['delete-post'],
        mutationFn: async (id: number) => deletePost(id),
    });
};

export const useTagsQuery = () => {
    return useSuspenseQuery({
        queryKey: ['tags'],
        queryFn: () => getTags(),
    });
};

export const useCategoriesQuery = () => {
    return useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    });
};

export const useSeoKeywordsQuery = () => {
    return useSuspenseQuery({
        queryKey: ['seo-keywords'],
        queryFn: async () => getSeoKeywords(),
    });
};

export const usCreateSeoKeywordMutation = () => {
    return useMutation({
        mutationKey: ["create-seo-keyword"],
        mutationFn: async (data: CreateTagPayload) => createSeoKeyword(data),
    });
}


// Create Category
export const useCreateCategoryMutation = () => {
    return useMutation({
        mutationKey: ["create-category"],
        mutationFn: async (data: CreateCategoryPayload) => createCategory(data),
    });
};

export const useCreateTagMutation = () => {
    return useMutation({
        mutationKey: ["create-category"],
        mutationFn: async (data: CreateTagPayload) => createCategory(data),
    });
};


