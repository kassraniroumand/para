"use client"
import React from 'react';
import {usePostByIdQuery, useUpdatePostMutation} from "@/app/hooks/useBlog";
import {Button} from "@aws-amplify/ui-react";

const Page = () => {
    const {data} = usePostByIdQuery(1);
    const {mutateAsync} = useUpdatePostMutation();
    console.log(data)

    const handleUpdate = async () => {
        try {
            await mutateAsync({
                id: 1,
                data: {
                    title: "Updated Title",
                    content: "Updated Content",
                }
            });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div>
            id
            <Button onClick={() => handleUpdate()}>Update Post</Button>
        </div>
    );
};

export default Page;