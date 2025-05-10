'use server'

import {apiClient, publicApiClient} from "@/app/utils/api-client";
import {
    GetBlogsParameter,
    HomepageData,
    PortfolioPage,
    PortfolioParameter,
    postInputType,
    PostType
} from "@/app/types";

export async function getHomePage() : Promise<HomepageData> {
    const response = await publicApiClient.get("/")
    return response.data
}

export async function getPortfolioPage({isFeatured}: PortfolioParameter):  Promise<PortfolioPage> {
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

// get blogs
export const getBlogs = async (parameter: GetBlogsParameter = {}) : Promise<PostType[]> => {
    const response = await apiClient.get("/blogs")
    return response.data
}

export const updateBlogs = async ({id, data}:{id: string, data: Partial<postInputType>})  => {
    const response = await publicApiClient.patch(`/blogs/${id}`, data)
    return response.data
}