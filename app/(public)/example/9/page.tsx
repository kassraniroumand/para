"use client"
import {useRef} from "react";
import {useScroll, useTransform, motion} from "framer-motion";

function Paragraph({ paragraph }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.8", "end 0.7"]
    });

    const words = paragraph.split(" ");

    return (
        <p
            ref={container}
            className="text-2xl sm:text-4xl leading-relaxed p-4 text-black dark:text-white"
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

const Word = ({ children, progress, range }) => {
    const amount = range[1] - range[0];
    const step = amount / children.length;

    return (
        <span className="relative inline-block mx-1">
      {children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step);
          return (
              <Char key={`c_${i}`} progress={progress} range={[start, end]}>
                  {char}
              </Char>
          );
      })}
    </span>
    );
};

const Char = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className="relative inline-block">
      <span className="opacity-0 pointer-events-none">{children}</span>
      <motion.span
          className="absolute left-0 top-0 text-white"
          style={{ opacity }}
      >
        {children}
      </motion.span>
    </span>
    );
};


const Page = () => {
    return (
        <div className={"bg-black h-svh flex flex-col items-center justify-center "}>
            <div className={"container"}>
                <Paragraph paragraph={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores esse et ipsam sequi veniam. Aliquid amet dolores laudantium, non quas repellendus reprehenderit voluptatibus. Architecto consectetur consequuntur eum ipsa magni quam recusandae rem totam. Commodi, cumque deserunt dignissimos error, harum, incidunt libero molestiae perspiciatis quidem quos temporibus voluptate. Cumque, rem."} />
            </div>
        </div>
    );
};

export default Page;
