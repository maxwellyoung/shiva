"use client";

import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Contact = () => {
  return (
    <section className="py-20 bg-[#111]">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`${spaceGrotesk.className} text-2xl md:text-3xl font-light mb-12 tracking-tight`}
        >
          CONTACT
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg font-light">
                For inquiries and collaborations:
              </p>
              <a
                href="mailto:info@shivamizani.com"
                className="block text-xl hover:text-gray-400 transition-colors"
              >
                info@shivamizani.com
              </a>
              <div className="h-px w-12 bg-white/20" />
              <p className="text-sm text-gray-400">
                Based in Los Angeles, CA
                <br />
                Available worldwide
              </p>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="NAME"
                className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
              />
            </div>
            <div>
              <textarea
                placeholder="MESSAGE"
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-white py-3 text-sm hover:bg-white hover:text-black transition-colors"
            >
              SEND MESSAGE
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
