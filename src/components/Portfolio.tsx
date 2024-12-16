"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const images = [
  { src: "/placeholder.svg?height=600&width=400", alt: "Portfolio 1" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Portfolio 2" },
  { src: "/placeholder.svg?height=500&width=400", alt: "Portfolio 3" },
  { src: "/placeholder.svg?height=600&width=400", alt: "Portfolio 4" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Portfolio 5" },
  { src: "/placeholder.svg?height=500&width=400", alt: "Portfolio 6" },
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start((i) => ({
      opacity: i === currentIndex ? 1 : 0.3,
      scale: i === currentIndex ? 1.2 : 0.8,
      rotateY: (i - currentIndex) * 60,
      z: i === currentIndex ? 200 : -200,
      transition: { duration: 0.7, ease: "easeInOut" },
    }));
  }, [currentIndex, controls]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    containerRef.current.style.transform = `perspective(1000px) rotateY(${
      x * 20
    }deg) rotateX(${-y * 20}deg)`;
  };

  return (
    <section
      id="portfolio"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20"
    >
      <motion.h2
        className={`text-5xl md:text-6xl font-bold mb-12 ${playfair.className}`}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Portfolio
      </motion.h2>
      <div
        ref={containerRef}
        className="relative w-full h-[60vh] perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (containerRef.current) {
            containerRef.current.style.transform =
              "perspective(1000px) rotateY(0deg) rotateX(0deg)";
          }
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            custom={index}
            animate={controls}
            style={{
              width: "60%",
              height: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="bg-purple-500 text-white px-6 py-2 rounded-full"
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="bg-pink-500 text-white px-6 py-2 rounded-full"
        >
          Next
        </motion.button>
      </div>
    </section>
  );
};

export default Portfolio;
