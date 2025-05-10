"use client"
// Function to extract query options
import {getBlogs, updateBlogs} from "@/app/utils/serverAction";
import {GetBlogsParameter, PortfolioParameter, postInputType} from "@/app/types";
import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {publicApiClient} from "@/app/utils/api-client";

export const blogsOptions = () => ({
    queryKey: ['blogs'] as const,
    queryFn: () => getBlogs(),
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
        mutationFn: async ({postId, data}: {postId: string, data:Partial<postInputType>}) => updateBlogs({id:postId, data})
    })
}