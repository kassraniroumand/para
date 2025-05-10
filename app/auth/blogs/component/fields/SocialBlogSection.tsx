"use client"
import React from 'react';
import {useFormContext} from "react-hook-form";

const SocialBlogSection = () => {
    const { control } = useFormContext(); // Fixed destructuring here
    return (
        <div>
            SocialBlogSection
        </div>
    );
};

export default SocialBlogSection;