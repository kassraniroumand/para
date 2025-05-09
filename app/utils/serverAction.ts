'use server'

import {apiClient, publicApiClient} from "@/app/utils/api-client";
import {HomepageData, PortfolioPage, PortfolioParameter} from "@/app/types";

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