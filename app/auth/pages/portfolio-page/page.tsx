import React from "react";
import PortfolioForm from "@/app/auth/pages/portfolio-page/components/PortfolioForm";
import {QueryClient} from "@tanstack/query-core";
import {getPortfolioPage} from "@/app/utils/serverAction";


const Page = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['portfolioPage', {}],
    queryFn: () => getPortfolioPage({}),
  });

  return (
    <PortfolioForm />
  );
};

export default Page;
