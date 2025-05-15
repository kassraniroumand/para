"use client"

import React from 'react';
import {useParams} from "next/navigation";
import {usePostByIdQuery} from "@/app/hooks/useBlog";
import EditorPreview from '../../component/EditorPreview.jsx';


const Page = () => {
    const params = useParams()
    const id = Number(params?.id); // converts string to number

    const {data: post, isLoading: postIsLoading} = usePostByIdQuery(id);
    console.log("post", post)
    console.log("postIsLoading", postIsLoading)

    return (
        <div>
            <EditorPreview htmlContent={post.content}/>
        </div>
    );
};

export default Page;