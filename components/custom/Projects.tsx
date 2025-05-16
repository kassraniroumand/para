import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {usePortfolioPageStore} from "@/app/store/useHomePageStore";
import Image from "next/image";

const ProjectItem = ({ item }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image
                    alt={item.title}
                    sizes="100"
                    fill
                    objectFit={"contain"}
                    src={item.image}
                />
            </div>
            <div className={"flex flex-col mt-4 gap-4"}>
                <h2 className="text-2xl font-bold text-center">{item.title}</h2>
                <p className="text-gray-600 text-lg font-medium text-center">{item.description[0]}</p>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const porfolioItems = usePortfolioPageStore((state) => state.portfolio?.portfolioPage.sections.sites);

    return (
        <div className="space-y-4 w-full gap-10 min-h-fit p-2 grid grid-cols-1 md:grid-cols-2 -mt-16">
            {porfolioItems?.map((item) => (
                <ProjectItem key={item.title} item={item} />
            ))}
        </div>
    );
};

export default Projects;
