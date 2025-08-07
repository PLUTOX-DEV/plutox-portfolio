'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9, rotate: 20 }}
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#1f1f3a] shadow-lg text-white border border-[#00ffff] hover:bg-[#0f0f2a] transition-all"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
