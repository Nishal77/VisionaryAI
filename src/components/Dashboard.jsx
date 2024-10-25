"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "../components/Sparkles";
import Image1 from "@/assets/image1.png";
import Image2 from "@/assets/image2.png";
import Image3 from "@/assets/image3.png";
import Image4 from "@/assets/image4.png";
import Image5 from "@/assets/image5.png";
import Image6 from "@/assets/image6.png";
import Image7 from "@/assets/image7.png";
import Image8 from "@/assets/image8.png";

export default function Home() {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center overflow-x-auto overflow-y-hidden">
      <div className="relative w-full max-w-4xl flex flex-col justify-center items-center z-10">
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="text-2xl sm:text-4xl text-white/90 text-center max-w-2xl mb-4"
        >
          Generate an image from text using the AI Image generator
        </motion.span>

        <motion.p
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, delay: 0.4 }}
          className="text-base text-gray-400 mt-4 text-center max-w-xl"
        >
          Enter your text and watch it transform into artwork instantly.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, delay: 0.6 }}
          className="mt-8 space-x-4 flex justify-center"
        >
          <Link href="/create">
            <Button className="bg-gradient-to-r from-primary/90 to-primary text-black px-8 py-6 rounded-full text-lg font-semibold shadow-lg border border-primary-foreground/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-xl">
              Start Creating
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              variant="secondary"
              className="bg-gradient-to-r from-secondary/80 to-secondary text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg border border-secondary-foreground/20 transition-all duration-300 hover:scale-105 hover:shadow-secondary/20 hover:shadow-xl"
            >
              Explore More
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="relative h-96 w-full flex justify-center items-center overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#50e850,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#76c57666] after:bg-zinc-900">
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>

      <section className="w-full overflow-hidden relative max-w-5xl mx-auto">
        <button className="absolute top-0 left-0 z-10">Pause</button>
        <article className="flex w-[200%] animate-bannermove">
          <div className="w-full">
            <ul className="flex bg-red-500 list-none p-0 m-0">
              <li className="w-full p-2">
                <img
                  src={Image1.src}
                  alt="Generated artwork 1"
                  className="rounded-lg shadow-lg"
                />
              </li>
              <li className="w-full p-2">
                <img
                  src={Image2.src}
                  alt="Generated artwork 2"
                  className="rounded-lg shadow-lg"
                />
              </li>
              <li className="w-full p-2">
                <img
                  src={Image3.src}
                  alt="Generated artwork 3"
                  className="rounded-lg shadow-lg"
                />
              </li>
              <li className="w-full p-2">
                <img
                  src={Image4.src}
                  alt="Generated artwork 4"
                  className="rounded-lg shadow-lg"
                />
              </li>
            </ul>
          </div>
          <div className="w-full">
            <ul className="flex bg-red-500 list-none p-0 m-0">
              <li className="w-full p-2">
                <img
                  src={Image5.src}
                  alt="Generated artwork 5"
                  className="rounded-lg shadow-lg"
                />
              </li>
              <li className="w-full p-2">
                <img
                  src={Image6.src}
                  alt="Generated artwork 6"
                  className="rounded-lg shadow-lg"
                />
              </li>
              <li className="w-full p-2">
                <img
                  src={Image7.src}
                  alt="Generated artwork 7"
                  className="rounded-lg shadow-lg"
                />
              </li>
              <li className="w-full p-2">
                <img
                  src={Image8.src}
                  alt="Generated artwork 8"
                  className="rounded-lg shadow-lg"
                />
              </li>
            </ul>
          </div>
        </article>
      </section>

      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
        }

        button {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }

        img {
          display: block;
          width: 100%;
        }

        section {
          width: 100%;
          overflow: hidden;
        }

        article {
          display: flex;
          width: 200%;
          animation: bannermove 20s linear infinite;
        }

        article.paused {
          -webkit-animation-play-state: paused;
          animation-play-state: paused;
        }

        div {
          width: 100%;
        }

        ul {
          display: flex;
          background: red;
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }

        li {
          width: 100%;
          background: blue;
        }

        li:nth-child(2) {
          background: green;
        }

        li:nth-child(3) {
          background: yellow;
        }

        @keyframes bannermove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
