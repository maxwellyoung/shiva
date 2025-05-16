"use client";

import { motion, useInView } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useRef } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, margin: "-100px" });

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 100,
      }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/80 backdrop-blur-md z-20 mt-24"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className={`${spaceGrotesk.className} text-lg font-light mb-4`}>
              Contact
            </h3>
            <a
              href="mailto:contact@shivamizani.com"
              className="block hover:text-stone-600 transition-colors"
            >
              contact@shivamizani.com
            </a>
            <a
              href="tel:+1234567890"
              className="block hover:text-stone-600 transition-colors"
            >
              +1 (234) 567-890
            </a>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={`${spaceGrotesk.className} text-lg font-light mb-4`}>
              Social
            </h3>
            <div className="space-y-2">
              <a
                href="https://instagram.com/shivamizani"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-stone-600 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-stone-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={`${spaceGrotesk.className} text-lg font-light mb-4`}>
              Navigation
            </h3>
            <nav className="space-y-2">
              <Link
                href="#work"
                className="block hover:text-stone-600 transition-colors"
              >
                Work
              </Link>
              <Link
                href="#about"
                className="block hover:text-stone-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="block hover:text-stone-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} Shiva Mizani. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
