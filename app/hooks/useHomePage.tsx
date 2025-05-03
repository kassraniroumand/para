import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/app/utils/api-client";
import { HomepageData } from "@/types/homepage";

export const fetchHomePage = async () => {
    try {
        console.log("Fetching homepage data...");
        const response = await apiClient.get("/");
        console.log("API response:", response);

        // Check if response has the expected structure
        if (response.data && response.data.data) {
            return response.data.data;
        }

        // If not, return the data directly if it has the right shape
        if (response.data && response.data.homepage) {
            return response.data;
        }

        // Otherwise, log and throw an error
        console.error("Unexpected response structure:", response.data);
        throw new Error("Unexpected response structure");
    } catch (error) {
        console.error("Error in fetchHomePage:", error);
        throw error;
    }
}

export const useHomePage = () => {
    return useQuery<HomepageData, Error, any>({
        queryKey: ['homePage'],
        queryFn: () => fetchHomePage(),
        retry: 1,
        refetchOnWindowFocus: false
    });
}
