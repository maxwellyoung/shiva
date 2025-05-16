"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import AnimatedGradient from "./AnimatedGradient";
import VerticalCutReveal from "./VerticalCutReveal";
import ImageTrail from "./ImageTrail";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const gradientColors = [
  "rgba(59, 130, 246, 0.5)",
  "rgba(96, 165, 250, 0.5)",
  "rgba(147, 197, 253, 0.5)",
  "rgba(251, 207, 232, 0.5)",
];

const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <AnimatedGradient colors={gradientColors} speed={10} blur="medium" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="ml-[4%] md:ml-[16.666%]"
          >
            {/* Instagram handle with subtle animation */}
            <motion.a
              href="https://instagram.com/shivamizani"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="inline-block mb-8 text-sm tracking-widest hover:text-stone-600 transition-all duration-300 group"
            >
              <span className="inline-block mr-2 opacity-60">↗</span>
              @shivamizani
            </motion.a>

            <h1
              className={`${spaceGrotesk.className} text-[8vw] md:text-[6vw] font-light leading-none tracking-tighter mb-8`}
            >
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="first"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 21,
                }}
              >
                {`SHIVA`}
              </VerticalCutReveal>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                MIZANI
              </motion.span>
            </h1>

            <motion.div
              className="flex flex-col md:flex-row items-start gap-4 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-lg md:text-xl font-light tracking-wider text-stone-500">
                ART DIRECTOR
              </p>
              <div className="hidden md:block h-px w-12 bg-stone-300 self-center" />
              <p className="text-lg md:text-xl font-light tracking-wider text-stone-500">
                FASHION STYLIST
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Image Trail */}
      <ImageTrail
        containerRef={containerRef}
        rotationRange={20}
        interval={150}
        newOnTop={true}
        animationSequence={[
          [
            { scale: 1, opacity: 0.8 },
            { duration: 0.4, ease: "easeOut" },
          ],
          [
            { scale: 0, opacity: 0 },
            { duration: 1.2, ease: "easeIn" },
          ],
        ]}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-48 h-64 relative rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={src}
              alt={`Fashion ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </ImageTrail>
    </section>
  );
};

export default Hero;
