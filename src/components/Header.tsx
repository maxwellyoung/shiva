"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
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
                  className={`${spaceGrotesk.className} text-lg tracking-wide`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  SHIVA MIZANI
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/#work">WORK</NavLink>
            <NavLink href="/#about">ABOUT</NavLink>
            <NavLink href="/#contact">CONTACT</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <span
              className={`w-6 h-px bg-black transition-transform ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-black transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-black transition-transform ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="space-y-4">
                <NavLink href="/#work">WORK</NavLink>
                <NavLink href="/#about">ABOUT</NavLink>
                <NavLink href="/#contact">CONTACT</NavLink>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, ...props }: NavLinkProps) => (
  <Link
    href={href}
    className={`${spaceGrotesk.className} block text-lg font-light tracking-wide hover:text-gray-500 transition-colors`}
    {...props}
  >
    {children}
  </Link>
);

export default Header;
