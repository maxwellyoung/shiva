'use client'

import { motion } from 'framer-motion'
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">Shiva Mizani</h3>
            <p className="text-gray-400">Visionary Art Director</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex space-x-4 mt-4 md:mt-0"
          >
            <a href="#" className="text-white hover:text-purple-500 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-purple-500 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-purple-500 transition-colors">
              <FaLinkedinIn size={24} />
            </a>
          </motion.div>
        </div>
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="my-8 border-gray-800"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center text-gray-400"
        >
          © {new Date().getFullYear()} Shiva Mizani. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

