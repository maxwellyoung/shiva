"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > heroHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left side */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!pastHero ? (
                <motion.a
                  key="instagram"
                  href="https://www.instagram.com/shivamizani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${spaceGrotesk.className} text-lg tracking-widest hover:text-gray-500 transition-colors`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  @shivamizani
                </motion.a>
              ) : (
                <motion.span
                  key="name"
                  className={`${spaceGrotesk.className} text-lg tracking-wide cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => scrollToSection("hero")}
                >
                  SHIVA MIZANI
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-sm tracking-widest hover:text-gray-500 transition-colors"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm tracking-widest hover:text-gray-500 transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm tracking-widest hover:text-gray-500 transition-colors"
            >
              CONTACT
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
