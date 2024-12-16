"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
  };

  useEffect(() => {
    const textElements = document.querySelectorAll("p, h1, h2, h3, a, button");
    const mouseOver = () => setCursorVariant("text");
    const mouseLeave = () => setCursorVariant("default");

    textElements.forEach((element) => {
      element.addEventListener("mouseover", mouseOver);
      element.addEventListener("mouseleave", mouseLeave);
    });

    return () => {
      textElements.forEach((element) => {
        element.removeEventListener("mouseover", mouseOver);
        element.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, []);

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={spring}
      />
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="cursor-trail"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            delay: index * 0.02,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
