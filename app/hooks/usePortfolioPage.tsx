"use client"

import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {apiClient} from "@/app/utils/api-client";
import {getPortfolioPage} from "@/app/utils/serverAction";
import {PortfolioPage, PortfolioParameter} from "@/app/types";
import {getPortfolioPageClient} from "@/app/utils/clientAction";


export async function createPortfolioPage(data: PortfolioPage) {
  try {
      const response = await apiClient.post<any, PortfolioPage>("/post-portfolio", data);
      return response['data'];
  } catch (error) {
      throw error;
  }
}

// Function to extract query options
export const portfolioQueryOptions = ({ isFeatured }: PortfolioParameter = {}) => ({
    queryKey: ['portfolioPage', isFeatured] as const,
    queryFn: () => getPortfolioPageClient({ isFeatured }),
    retry: 1,
    refetchOnWindowFocus: false,
});

export const useGetPortfolioPage = (params: PortfolioParameter = {}) => {
    const queryOptions = portfolioQueryOptions(params);
    return useSuspenseQuery(queryOptions)
};

/**
 * Hook for creating or updating portfolio page data
 * Uses React Query's useMutation for API interactions
 */
export const useCreatePortfolioPage = () => {
    return useMutation({
        mutationFn: async (data: PortfolioPage) => {
            try {
                // Ensure we have a clean copy without any circular references
                return await createPortfolioPage(data);
            } catch (error) {
                console.error("Mutation error:", error);
                throw error;
            }
        },
        retry: 1,
        onError: (error) => {
            console.error("Portfolio mutation failed:", error);
        }
    });
}


