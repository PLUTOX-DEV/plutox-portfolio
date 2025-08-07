'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Lock,
  User,
  Mail,
  Bell,
  MessageSquare,
  Settings,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { icon: Lock, label: 'Home', href: '/' },
  { icon: User, label: 'About', href: '/about' },
  { icon: Mail, label: 'Projects', href: '/projects' },
  { icon: Bell, label: 'Experience', href: '#experience' },
  { icon: MessageSquare, label: 'Contact', href: '/contact' },
  { icon: Settings, label: 'Admin', href: '/admin' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <>
      {/* 🔘 Hamburger Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-[999]">
        <button
          onClick={toggle}
          className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-purple-400 hover:bg-purple-700/10"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🖥️ Sidebar for Desktop */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-16 bg-zinc-900/50 border-r border-zinc-800 backdrop-blur-lg flex-col items-center py-6 space-y-6 z-50">
        {navItems.map(({ icon: Icon, label, href }, idx) => (
          <Link href={href} key={idx}>
            <motion.button
              title={label}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-700 hover:border-purple-500 transition-all duration-200 bg-zinc-800/40 hover:bg-purple-700/10 shadow-sm hover:shadow-purple-500/30 text-zinc-400 hover:text-purple-400"
            >
              <Icon size={20} className="transition duration-300" />
              <span className="absolute left-16 whitespace-nowrap text-sm bg-purple-600 text-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200">
                {label}
              </span>
            </motion.button>
          </Link>
        ))}
      </aside>

      {/* 📱 Floating Sidebar for Mobile (No black panel!) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed top-20 left-4 z-[998] flex flex-col space-y-4"
          >
            {navItems.map(({ icon: Icon, label, href }, idx) => (
              <Link href={href} key={idx}>
                <motion.button
                  title={label}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 text-white text-sm font-medium border border-zinc-700 hover:border-purple-500 px-4 py-2 rounded-xl bg-zinc-900/70 hover:bg-purple-700/10 backdrop-blur-sm shadow-md shadow-purple-500/10"
                >
                  <Icon size={18} className="text-purple-400" />
                  {label}
                </motion.button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
