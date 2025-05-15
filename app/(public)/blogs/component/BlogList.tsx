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

// dynamic page
export const dynamic = 'force-dynamic';

const BlogListPage = () => {
    const { data = [], isLoading } = useAllPostsQuery();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutationIsPublished();
    const [pendingId, setPendingId] = React.useState<number | null>(null);
    const useDeletePostMutation1 = useDeletePostMutation();

    const handleDelete = async (postId: number) => {
        try {
            await useDeletePostMutation1.mutateAsync(postId);
            await queryClient.invalidateQueries({ queryKey: ["blogs"] });
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const columns: ColumnDef<Post>[] = [
        {
            accessorKey: "id",
            header: "id",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("id")}</div>
            ),
        },
        {
            accessorKey: "title",
            header: "title",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("title")}</div>
            ),
        },
        // {
        //     accessorKey: "is_published",
        //     header: "Status",
        //     length: 300,
        //     cell: ({ row }) => {
        //         const blog = row.original;
        //         const postId = blog.id;
        //
        //         const handleToggle = async () => {
        //             try {
        //                 setPendingId(postId);
        //                 await mutateAsync({
        //                     postId,
        //                     data: {
        //                         isPublished: !blog.isPublished,
        //                     }
        //                 });
        //                 // @ts-ignore
        //                 await queryClient.invalidateQueries(["blogs"]);
        //             } catch (error) {
        //                 console.error("Failed to update post status:", error);
        //             } finally {
        //                 setPendingId(null);
        //             }
        //         };
        //
        //         return (
        //             <div className="flex items-center gap-2">
        //                 <Switch
        //                     checked={blog.isPublished}
        //                     onCheckedChange={handleToggle}
        //                     disabled={pendingId === postId}
        //                 />
        //                 <span className="text-sm text-gray-600">
        //                     {blog.isPublished ? "Published" : "Draft"}
        //                 </span>
        //                 {pendingId === postId && <Loader2 className="w-4 h-4 animate-spin" />}
        //             </div>
        //         );
        //     },
        // },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const blog = row.original;
                const postId = blog.id;

                return (
                    <div className="flex space-x-2">
                        <Link href={`/blogs/${postId}`} passHref>
                            <Button variant="outline" size="sm" className="h-8">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                            </Button>
                        </Link>
                        <Button onClick={()=>handleDelete(postId)} variant="outline" size="sm" className="h-8">
                            <Delete className="h-4 w-4 mr-1" />
                        </Button>
                    </div>
                );
            },
        }
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                {/* Add navigation link to create new post if needed */}
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                {isLoading ? (
                    <div className="flex items-center justify-center h-60">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        <span className="ml-2 text-gray-500">Loading posts...</span>
                    </div>
                ) : (
                    <Table className="min-w-full table-auto text-sm text-left">
                        <TableHeader className="bg-gray-100 sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="px-4 py-3 text-gray-700 font-semibold border-b"
                                        >
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, rowIndex) => (
                                    <TableRow
                                        key={row.id}
                                        className={rowIndex % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-4 py-3 border-b"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-gray-500"
                                    >
                                        No blog posts found. Create your first post to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default BlogListPage;