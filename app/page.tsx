import React from 'react'
import {fetchHomePage, useHomePage} from "@/app/hooks/useHomePage";
import {HomepageData} from "@/types/homepage";
import {dehydrate, hydrate, HydrationBoundary} from '@tanstack/react-query';
import Content from "@/app/Content";
import {getQueryClient} from "@/app/services/getQueryClient";


const App = async () => {
    // const { isAuthenticated, user } = useAuth();
    // const homePage = res.ho/**/mepage as HomepageData;
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({ queryKey: ['homepage'], queryFn: fetchHomePage });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/*{JSON.stringify(homePage, null, 2)}*/}
            <Content />
            {/* <StepDetail /> */}
        </HydrationBoundary>
    )
}




export default App
