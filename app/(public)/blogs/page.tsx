import React from 'react';
import {getQueryClient} from "@/app/services/getQueryClient";
import {getAllPosts, getPublishedBlogs} from "@/app/utils/serverAction";
import BlogsPagePage from "@/app/(public)/blogs/component/BlogList";
import BlogListPage from "@/app/(public)/blogs/component/BlogList";
import {getAllPostsClient} from "@/app/utils/clientAction";

const Page = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: async () => getPublishedBlogs(),
    })

    return (
        <>
            <BlogListPage />
        </>
    );
};

export default Page;