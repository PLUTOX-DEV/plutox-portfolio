'use client';

import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';

export default function AdminSettingsPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-[#0a0a23] px-4">
      {/* Glowing orbs */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-purple-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-cyan-400 opacity-20 rounded-full filter blur-2xl animate-ping"></div>

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="text-5xl md:text-6xl font-extrabold glitch neon-text mb-4"
          data-text="Settings Coming Soon"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Settings Coming Soon
        </motion.div>

        <motion.div
          className="text-lg text-purple-300 flex items-center justify-center gap-3 animate-pulse"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <FaTools className="text-cyan-400 text-2xl animate-spin-slow" />
          Under Construction by AI 🤖
        </motion.div>
      </motion.div>
    </div>
  );
}
