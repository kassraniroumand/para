"use client"

import {fetchHomePage, useHomePage} from "@/app/hooks/useHomePage";
import Header from "@/components/custom/Header";
import SubHeaderBanner from "@/components/custom/SubHeader";
import StepService from "@/components/custom/StepService";
// import Example1 from "@/app/(public)/example/1/page";
import Example2 from "@/app/(public)/example/2/page";
import React, {useEffect} from "react";
import {queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import {HomepageData} from "@/types/homepage";
import Example3 from "@/app/(public)/example/3/page";
import Example5 from "@/app/(public)/example/5/page";
import Example7 from "@/app/(public)/example/7/page";
import Example8 from "@/app/(public)/example/8/page";
import Example1 from "@/app/(public)/example/1/page";
import {useHomePageStore} from "@/app/store/useHomePageStore";
import Example9 from "@/app/(public)/example/9/page";

export const pokemonOptions = queryOptions<HomepageData>({
    queryKey: ['homepage'],
    queryFn: async () => {
        const response = fetchHomePage()
        return response
    },
})


const Content = () => {
    // const {data} = useHomePage()
    const { data, isLoading} = useSuspenseQuery(pokemonOptions)
    const setHomepage = useHomePageStore((state) => state.setHomepage)

    useEffect(() => {
        if (data) {
            setHomepage(data)  // Hydrate Zustand store with homepage data
        }
    }, [data])

    return (
        <div>
            {isLoading && (<div>loading</div>)}
            <Header data={data.homepage.hero} />
            <div className={"mt-5"}>
                <Example9 />
            </div>
            {/*<SubHeaderBanner data={data.homepage.statistics} />*/}
            {/* services */}
            <Example7 />
            <Example8 />
            {/*<StepService data={data.homepage.framework}/>*/}

            <Example1/>
            <Example2/>
            {/*<Example3 />*/}
            <Example5 />
        </div>
    );
};

export default Content;