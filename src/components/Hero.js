'use client';

import {
  Download,
  Bot,
  MapPin,
  Briefcase,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-10">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-3xl rounded-full z-0 animate-pulse" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl w-full text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-600">
            <TypeAnimation
              sequence={[
                'Hey, I’m Plutox —',
                1500,
                'Full Stack Web2 Developer —',
                1200,
                'CTO —',
                1200,
                'Hey, I’m Plutox —',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 text-white">
            <span className="bg-gradient-to-r from-white via-purple-500 to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]">
              Crafting stunning apps with code & chaos.
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <Link href="/contact">
              <button className="px-6 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition shadow-md shadow-purple-500/30 flex items-center gap-2 hover:scale-105 hover:shadow-purple-500/50 duration-300">
                <Briefcase size={18} /> Hire Me
              </button>
            </Link>

            <a
              href="/resume.pdf"
              download
              className="px-6 py-2 rounded-lg bg-purple-500 text-black hover:bg-purple-600 transition shadow-md shadow-purple-500/30 flex items-center gap-2 hover:scale-105 hover:shadow-purple-500/50 duration-300"
            >
              <Download size={18} /> Download Resume
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-zinc-300 mt-8 border-l-4 border-yellow-400 pl-4 bg-zinc-900/30 p-3 rounded-lg"
          >
            I’m a passionate Web Application Developer  with experience in Web2, Frontend, and Backend.
          </motion.p>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <div className="relative group animate-[neon-glow_3s_ease-in-out_infinite]">
            <div className="w-40 h-40 rounded-full border-2 border-purple-600 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.5)] transition duration-300 group-hover:shadow-[0_0_60px_rgba(168,85,247,0.8)]">
              <Image
                src="/avatar.png"
                width={160}
                height={160}
                alt="Avatar"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/50 p-2 rounded-full border border-purple-500 shadow-md animate-bounce">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-zinc-900/70 backdrop-blur-xl px-6 py-5 rounded-2xl w-full text-white border border-zinc-700 shadow-md shadow-purple-500/30"
          >
            <h3 className="text-purple-400 text-xl font-bold mb-3 tracking-wide">About Me</h3>
            <ul className="text-sm space-y-3 text-zinc-300">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-cyan-400" /> <span>Remote, Earth</span>
              </li>
              <li className="flex items-center gap-3">
                <Briefcase size={18} className="text-purple-400" /> <span>1.5+ yrs experience</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-400" /> <span>Open to work</span>
              </li>
            </ul>
          </motion.div>

          <motion.a
            href="/resume.pdf"
            download
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 w-full"
          >
            <button className="w-full px-8 py-3 bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-black font-semibold text-base rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-purple-500/50 duration-300">
              <Download size={20} /> Download Resume
            </button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
