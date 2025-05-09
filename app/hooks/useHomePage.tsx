import {useSuspenseQuery} from "@tanstack/react-query";
import {apiClient} from "@/app/utils/api-client";
import {getHomePage} from "@/app/utils/serverAction";
import {HomepageData} from "@/app/types";

export const fetchHomePage = async (): Promise<HomepageData> => {
    try {
        const response = await apiClient.get("/");

        if (response.data && response.data.data) {
            return response.data.data as HomepageData;
        }

        if (response.data && response.data.homepage) {
            return response.data as HomepageData;
        }
        throw new Error("Unexpected response structure");
    } catch (error) {
        throw error;
    }
};


export const homepageQueryOptions = () => ({
    queryKey: ['homePage'] as const,
    queryFn: () => getHomePage(),
    retry: 1,
    refetchOnWindowFocus: false,
});

export const useHomePage = () => {
    return useSuspenseQuery(homepageQueryOptions());
}
