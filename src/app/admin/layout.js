'use client';

import { motion } from 'framer-motion';
import { FaCogs } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0a0a23] via-[#1f1147] to-[#0a0a23] text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glitch Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold glitch mb-8 text-center"
        data-text="Admin Control Center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Admin Control Center
      </motion.h1>

      {/* Glowing Icon */}
      <motion.div
        className="mb-10 glow-pulse text-5xl text-neon-purple"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FaCogs />
      </motion.div>

      {/* Glass Card Container for Page Content */}
      <motion.div
        className="glass-card w-full max-w-5xl p-6 md:p-10 rounded-2xl animate-fade-in"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
