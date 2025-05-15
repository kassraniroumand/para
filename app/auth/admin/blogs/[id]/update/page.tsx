"use client"

import React from 'react';
import {useParams} from "next/navigation";
import PostMultiForm from "@/app/auth/admin/blogs/component/PostMultiForm";
import {usePostByIdQuery} from "@/app/hooks/useBlog";

const Page = () => {
    const params = useParams()
    const id = Number(params?.id); // converts string to number

    const {data: post, isLoading: postIsLoading} = usePostByIdQuery(id);
    console.log("post", post)
    console.log("postIsLoading", postIsLoading)

    return (
        <div>
            {id} - update
            <PostMultiForm post={post} />
        </div>
    );
};

export default Page;