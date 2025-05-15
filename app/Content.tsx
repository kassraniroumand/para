"use client"

import React, {useEffect} from "react";

import {homepageQueryOptions} from "@/app/hooks/useHomePage";
import {portfolioQueryOptions} from "@/app/hooks/usePortfolioPage";
import {useSuspenseQueries} from "@tanstack/react-query";
import {useHomePageStore, usePortfolioPageStore} from "@/app/store/useHomePageStore";
import Header from "@/components/custom/Header";
import Example7 from "@/app/(public)/example/7/page";
import TextScroll from "@/app/(public)/example/9/page";
import Example1 from "@/app/(public)/example/1/page";
import Example8 from "@/app/(public)/example/8/page";
import Example5 from "@/app/(public)/example/5/page";
import Example2 from "@/app/(public)/example/2/page";
import Projects from "@/components/custom/Projects";


const Content = () => {

    const results = useSuspenseQueries({
        queries: [
            homepageQueryOptions(),
            portfolioQueryOptions({ isFeatured: true }),
        ] as const,
    });


    const [homepageResult, portfolioResult] = results;

    const setHomepage = useHomePageStore((state) => state.setHomepage)
    const setPortfolioPage  = usePortfolioPageStore((state) => state.setPortfolioPage)

    useEffect(() => {
        if (homepageResult.data && portfolioResult.data) {
            const currentHomepage = useHomePageStore.getState().homepage;
            const currentPortfolioPage = usePortfolioPageStore.getState().portfolio;

            if (currentHomepage !== homepageResult.data) {
                setHomepage(homepageResult.data);
            }

            if (currentPortfolioPage !== portfolioResult.data) {
                setPortfolioPage(portfolioResult.data);
            }
        }
    }, [homepageResult.data, portfolioResult.data]);


    return (
        <div>
            {/*{isLoading && (<div>loading</div>)}*/}
            <Header />
            <TextScroll />
            <Example7 />
            <Example8 />
            <Example1/>
            <Example2 />
            <Example5 />
        </div>
    );
};

export default Content;