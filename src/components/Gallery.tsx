"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const images = [
  { src: "/placeholder.svg?height=800&width=600", alt: "Fashion Editorial 1" },
  { src: "/placeholder.svg?height=600&width=800", alt: "Fashion Editorial 2" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Fashion Editorial 3" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Fashion Editorial 4" },
  { src: "/placeholder.svg?height=600&width=800", alt: "Fashion Editorial 5" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Fashion Editorial 6" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`${spaceGrotesk.className} text-2xl md:text-3xl font-light mb-12 tracking-tight`}
        >
          SELECTED WORKS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/20">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] bg-[#111] overflow-hidden group"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-[3/4]">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
