"use client"

import {fetchHomePage, useHomePage} from "@/app/hooks/useHomePage";
import Header from "@/components/custom/Header";
import SubHeaderBanner from "@/components/custom/SubHeader";
import StepService from "@/components/custom/StepService";
// import Example1 from "@/app/(public)/example/1/page";
import Example2 from "@/app/(public)/example/2/page";
import React from "react";
import {queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import {HomepageData} from "@/types/homepage";
import Example3 from "@/app/(public)/example/3/page";
import Example5 from "@/app/(public)/example/5/page";
import Example7 from "@/app/(public)/example/7/page";
import Example8 from "@/app/(public)/example/8/page";

export const pokemonOptions = queryOptions<HomepageData>({
    queryKey: ['homepage'],
    queryFn: async () => {
        const response = fetchHomePage()
        return response['homepage']
    },
})


const Content = () => {
    // const {data} = useHomePage()
    const { data } = useSuspenseQuery(pokemonOptions)
    console.log("data", data)

    return (
        <div>
            <Header data={data.homepage.hero} />
            <SubHeaderBanner data={data.homepage.statistics} />
            <Example7 />
            <Example8 />
            <StepService data={data.homepage.framework}/>
            {/*<Example1 data={data.homepage.projects}/>*/}
            <Example2/>
            {/*<Example3 />*/}
            <Example5 />


        </div>
    );
};

export default Content;