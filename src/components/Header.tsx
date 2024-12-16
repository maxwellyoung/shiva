"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`${spaceGrotesk.className} text-lg tracking-tight`}
          >
            SM
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <span
              className={`w-6 h-px bg-white transition-transform ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-white transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-white transition-transform ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="space-y-4">
                <NavLink href="/#work" onClick={() => setIsOpen(false)}>
                  WORK
                </NavLink>
                <NavLink href="/#about" onClick={() => setIsOpen(false)}>
                  ABOUT
                </NavLink>
                <NavLink href="/#contact" onClick={() => setIsOpen(false)}>
                  CONTACT
                </NavLink>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ href, children, ...props }) => (
  <Link
    href={href}
    className={`${spaceGrotesk.className} block text-3xl font-light tracking-tight hover:text-gray-400 transition-colors`}
    {...props}
  >
    {children}
  </Link>
);

export default Header;
