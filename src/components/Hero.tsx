"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX / width - 0.5) * 2;
        const y = (clientY / height - 0.5) * 2;
        containerRef.current.style.setProperty("--mouse-x", x.toFixed(2));
        containerRef.current.style.setProperty("--mouse-y", y.toFixed(2));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen flex items-center justify-center relative bg-[#111] overflow-hidden"
      style={
        {
          "--mouse-x": "0",
          "--mouse-y": "0",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 gap-px opacity-10">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1
            className={`${spaceGrotesk.className} text-[8vw] md:text-[6vw] font-light leading-none tracking-tighter mb-6`}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              SHIVA
            </motion.span>
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
            className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl font-light tracking-wide">
              ART DIRECTOR
            </p>
            <div className="h-px md:h-8 w-12 md:w-px bg-white/20" />
            <p className="text-lg md:text-xl font-light tracking-wide">
              FASHION STYLIST
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at calc(50% + calc(var(--mouse-x) * 50%)) calc(50% + calc(var(--mouse-y) * 50%)), rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 50%)`,
        }}
      />

      <div className="absolute bottom-12 left-0 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="inline-flex flex-col items-center gap-2"
        >
          <motion.div
            className="w-px h-12 bg-white/20"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-sm tracking-widest">SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
