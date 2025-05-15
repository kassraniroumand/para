"use client"

import React from 'react';
import {
    useAllPostsQuery,
    useBlogs,
    useDeletePostMutation,
    useMutationIsPublished,
    usePublishedBlogsQuery
} from "@/app/hooks/useBlog";
import { useQueryClient } from "@tanstack/react-query";
import {ColumnDef, flexRender, useReactTable} from "@tanstack/react-table";
import { getCoreRowModel } from "@tanstack/table-core";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from "@/components/ui/switch";
import {Loader2, Eye, Edit, Delete} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {Post} from "@/app/types";
import Image from "next/image";

// dynamic page
export const dynamic = 'force-dynamic';


const PostCard = ({post}: {post:Post}) => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"relative w-full aspect-square rounded-xl overflow-hidden"}>
                <Image src={post.image} alt={post.title} sizes={"100"} fill={true} />
            </div>
            <div>
                <h2 className={"text-2xl font-bold py-4"}>{post.title}</h2>
                <p className={"text-gray-600 text-lg font-medium"}>{post.description}</p>
            </div>
        </div>
    );
};


const BlogListPage = () => {
    const { data : posts, isLoading } = useAllPostsQuery();
    console.log(posts)
    return (
        <div className={"px-6 sm:px-24"}>
            { isLoading && (<div>loading</div>)}
            <div className={"grid grid-cols-1 sm:grid-cols-3"}>
                {posts && posts.map(post => (
                    <Link href={`/blogs/${post.id}`}>
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogListPage;