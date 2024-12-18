"use client";

import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Contact = () => {
  return (
    <section className="py-32 bg-[#111]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`${spaceGrotesk.className} text-5xl font-light mb-24 text-white`}
          >
            CONTACT
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-24">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-xl font-light text-white">
                  For inquiries and collaborations:
                </p>
                <a
                  href="mailto:info@shivamizani.com"
                  className="text-2xl block text-white hover:text-gray-400 transition-colors"
                >
                  info@shivamizani.com
                </a>
                <div className="h-px w-12 bg-white/20" />
                <div className="text-base text-gray-400">
                  <p>Based in Los Angeles, CA</p>
                  <p>Available worldwide</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="NAME"
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-base text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-base text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-1">
                <textarea
                  placeholder="MESSAGE"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-base text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-white py-3 text-base text-white hover:bg-white hover:text-black transition-colors"
              >
                SEND MESSAGE
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
