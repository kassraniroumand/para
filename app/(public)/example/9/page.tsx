"use client"
import {ReactNode, useRef} from "react";
import {useScroll, useTransform, motion, MotionValue} from "framer-motion";
import {useHomePageStore} from "@/app/store/useHomePageStore";

function Paragraph({paragraph}: { paragraph?: string }) {
    const container = useRef(null);
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ["start 0.8", "end 0.7"]
    });

    const words = paragraph?.split(" ");

    return (
        <p
            ref={container}
            className="text-2xl sm:text-4xl leading-relaxed p-4 text-black dark:text-white"
        >
            {words?.map((word, i) => {
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

const Word = ({children, progress, range}: { children: string, progress: MotionValue<number>, range: number[] }) => {
    const amount = range[1] - range[0];
    const step = amount / children?.length;

    return (
        <span className="relative inline-block mx-1">
        {children?.split("").map((char: string, i: number) => {
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

const Char = ({children, progress, range}: {children: string, progress: MotionValue<number>, range: number[]}) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className="relative inline-block">
      <span className="opacity-0 pointer-events-none">{children}</span>
      <motion.span
          className="absolute left-0 top-0 text-white"
          style={{opacity}}
      >
        {children}
      </motion.span>
    </span>
    );
};


const TextScroll = () => {
    const homepage = useHomePageStore((state) => state.homepage);

    return (
        <div className={"bg-black h-svh flex flex-col items-center justify-center "}>
            <div className={"container"}>
                <Paragraph paragraph={homepage?.homepage.sections.textScrollbar.text}/>
            </div>
        </div>
    );
};

export default TextScroll;
