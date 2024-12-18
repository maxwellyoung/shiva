"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Helper function to get random position
function getRandomPosition(width: number, height: number) {
  return {
    x: Math.random() * width * 0.5 - width * 0.25,
    y: Math.random() * height * 0.5 - height * 0.25,
  };
}

// Initial images without positions
const initialImages = [
  { id: 1, src: "/image1.jpg", alt: "Fashion 1", x: 0, y: 0 },
  { id: 2, src: "/image2.jpg", alt: "Fashion 2", x: 0, y: 0 },
  { id: 3, src: "/image3.jpg", alt: "Fashion 3", x: 0, y: 0 },
];

interface DragInfo extends PanInfo {
  point: {
    x: number;
    y: number;
  };
}

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState<
    null | (typeof initialImages)[0]
  >(null);
  const [imagePositions, setImagePositions] = useState(initialImages);
  const constraintsRef = useRef(null);

  // Initialize positions on mount and handle window resize
  useEffect(() => {
    const updatePositions = () => {
      setImagePositions(
        initialImages.map((img) => ({
          ...img,
          ...getRandomPosition(window.innerWidth, window.innerHeight),
        }))
      );
    };

    // Set initial positions
    updatePositions();

    // Handle resize
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  // Add useEffect for escape key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: DragInfo,
    id: number
  ) => {
    setImagePositions((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, x: img.x + info.offset.x, y: img.y + info.offset.y }
          : img
      )
    );
  };

  return (
    <>
      <section
        id="hero"
        ref={constraintsRef}
        className="h-screen flex items-center justify-center relative bg-white overflow-hidden"
      >
        {/* Main Content - moved to back */}
        <motion.div className="relative container mx-auto px-4">
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
              <div className="h-px md:h-8 w-12 md:w-px bg-black/20" />
              <p className="text-lg md:text-xl font-light tracking-wide">
                FASHION STYLIST
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Draggable Images - moved to front with higher z-index */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {imagePositions.map((image) => (
            <motion.div
              key={image.id}
              drag
              dragMomentum={false}
              dragElastic={0.1}
              initial={{ opacity: 0, x: image.x, y: image.y, scale: 0.8 }}
              animate={{
                opacity: 1,
                x: image.x,
                y: image.y,
                scale: 1,
                transition: {
                  duration: 0.8,
                  delay: image.id * 0.2,
                },
              }}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              className="absolute cursor-grab active:cursor-grabbing"
              onDragEnd={(_, info) => handleDrag(_, info, image.id)}
              onClick={() => setSelectedImage(image)}
            >
              <div className="w-48 h-64 relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-[80vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
