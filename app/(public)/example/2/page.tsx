"use client"
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import {usePublishedBlogsQuery} from "@/app/hooks/useBlog";
import Image from "next/image";
import Link from "next/link";

const Example2 = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

type CardType = {
  url: string;
  title: string;
  id: number;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const {data:blogs} = usePublishedBlogsQuery();

  console.log(blogs)
  const cards = blogs?.map((blog) => ({
    url: blog.image,
    title: blog.title,
    id: blog.id,
  }));

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards?.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <Link href={`/blogs/${card.id}`}>
      <div
          key={card.id}
          className="group flex flex-col relative h-[450px] w-[450px] overflow-hidden justify-center items-center"
      >
        <div className={"relative w-full aspect-square overflow-hidden"}>
          <Image alt={card.url} src={card.url} fill={true} sizes={"100"} objectFit={"cover"} />
        </div>
        <p className={"text-white opacity-50 text-lg text-wrap mt-4"}>
          {card.title}
        </p>
      </div>
    </Link>
  );
};

export default Example2;
