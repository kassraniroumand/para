"use client"

import React from 'react';
import {useParams} from "next/navigation";


const Page = () => {
    const params = useParams()
    const id = params?.id
    console.log(id)

    return (
        <div>
            {id} - view
        </div>
    );
};

export default Page;