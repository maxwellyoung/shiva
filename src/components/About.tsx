"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div style={{ y: y1 }} className="w-full md:w-1/2 relative">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Shiva Mizani"
            width={600}
            height={800}
            className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300 rounded-lg shadow-2xl"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-purple-500 to-pink-500 mix-blend-overlay"
            style={{ rotate }}
          />
        </motion.div>
        <motion.div style={{ y: y2 }} className="w-full md:w-1/2">
          <motion.h2
            className={`text-5xl md:text-6xl font-bold mb-6 ${playfair.className}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Shiva
          </motion.h2>
          <motion.p
            className="text-xl mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shiva Mizani is a visionary art director and stylist, pushing the
            boundaries of fashion and visual storytelling. With an innate
            ability to blend avant-garde concepts with commercial appeal, Shiva
            creates captivating narratives that challenge perceptions and
            inspire audiences worldwide.
          </motion.p>
          <motion.p
            className="text-xl mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Her work is characterized by bold juxtapositions, unexpected
            textures, and a keen eye for the interplay of light and shadow.
            Shiva&apos;s unique approach has made her a sought-after creative
            force in the fashion and art industries, collaborating with renowned
            brands and publications to create unforgettable visual experiences.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
