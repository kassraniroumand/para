"use client"
import React from 'react';
import {useFormContext} from "react-hook-form";

const SeoBlogSection = () => {
    const { control } = useFormContext(); // Fixed destructuring here

    return (
        <div>
            SeoBlogSection
        </div>
    );
};

export default SeoBlogSection;