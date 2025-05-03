"use client"

import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { useScroll, useTransform, motion, useInView } from "framer-motion"

const projects = [
  {
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leidinger is a young creative brimming with talent and ideas.",
    src: "rock.jpg",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#BBACAF",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes - so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves.",
    src: "tree.jpg",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#977F6D",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal, they're encoded with an ambiguity - a certain tension - that lets the viewer find their own story within them.",
    src: "water.jpg",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D",
  },
]

interface CardProps {
  title: string
  description: string
  src: string
  link: string
  color: string
  i: number
  headerText?: string
  id: string
  setActive: Dispatch<SetStateAction<string | null>>
}

const Card = ({ title, description, src, link, color, i, headerText, id, setActive }: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" })

  useLayoutEffect(() => {
    if (inView) {
      setActive(id)
    }
  }, [inView, id, setActive])

  return (
    <div
      ref={container}
      className="h-screen sticky top-1/2 transform -translate-y-1/2 flex items-center justify-center"
    >
    <div
        ref={ref}
        className="bg-red-500 flex flex-col relative h-[60svh] w-[90vw] md:w-[80vw] max-w-[1000px] rounded-[25px] p-[20px] md:p-[50px] shadow-lg"
        // style={{ backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
      >
        <h2 className="text-center m-0 text-[28px] font-bold">{title}</h2>
        <div className="flex flex-col md:flex-row h-full mt-[30px] md:mt-[50px] gap-[30px] md:gap-[50px]">
          <div className="w-full md:w-[40%] relative">
            <h3 className="text-xl font-bold mb-4">{headerText || title}</h3>
            <p className="text-[16px]">
              <span className="text-[28px] font-serif">{description[0]}</span>
              {description.slice(1)}
            </p>
            <span className="flex items-center gap-1 mt-4">
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-[14px] underline cursor-pointer">
                See more
              </a>
            </span>
          </div>
          <div className="relative w-full md:w-[60%] h-[300px] md:h-full rounded-[25px] overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image fill src={`/images/${src}`} alt={`Project by ${title}`} className="object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExampleWithSidebar = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  const getNextProjectHeader = (index: number): string => {
    if (index < projects.length - 1) {
      return `Next: ${projects[index + 1].title}`
    }
    return "End of Projects"
  }

  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4">
      {/* Sidebar */}
      <aside className="hidden lg:block col-span-1 sticky top-0 h-screen p-6 bg-white border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <ul className="space-y-3">
          {projects.map((proj, idx) => (
            <li
              key={proj.title}
              className={`cursor-pointer text-sm ${
                activeSection === `${idx}` ? "font-bold text-blue-500" : "text-gray-600"
              }`}
            >
              {proj.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className="col-span-3">
        <div ref={container}>
          {projects.map((project, i) => (
            <Card
              key={i}
              id={`${i}`}
              i={i}
              {...project}
              setActive={setActiveSection}
              headerText={getNextProjectHeader(i)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default ExampleWithSidebar
