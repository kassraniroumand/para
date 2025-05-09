import React from 'react'
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import Content from "@/app/Content";
import {getQueryClient} from "@/app/services/getQueryClient";
import {getHomePage, getPortfolioPage} from "@/app/utils/serverAction";

export const dynamic = 'force-dynamic';


const App = async () => {

    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['homepage'],
        queryFn: getHomePage
    });

    // Prefetch portfolio data - fixed implementation
    await queryClient.prefetchQuery({
        queryKey: ['portfolioPage', {isFeatured: true}],
        queryFn: async () => {
            return getPortfolioPage({isFeatured: true});
        }
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Content />
        </HydrationBoundary>

    )
}




export default App
