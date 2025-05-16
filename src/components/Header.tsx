"use client";

import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Header = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for lightbox state and scroll position
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const hasLightbox = document.querySelector('[data-lightbox="true"]');
          setIsLightboxOpen(!!hasLightbox);
        }
      });
    });

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > 0); // Change to any scroll
    };

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isLightboxOpen
          ? "z-30 bg-white/30 backdrop-blur-xl"
          : isScrolled
            ? "z-40 bg-white/80 backdrop-blur-md"
            : "z-40 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className={`${spaceGrotesk.className} text-lg font-light tracking-tight`}
          >
            SHIVA MIZANI
          </Link>
          <nav className="space-x-8">
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-stone-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
