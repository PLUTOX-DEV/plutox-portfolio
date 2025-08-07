'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaReact,
  FaNodeJs,
  FaEthereum,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiMongodb,
  SiTypescript,
  SiDialogflow,
  SiOpenai,
  SiIpfs,
  SiDjango,
} from 'react-icons/si';
import { getProjects } from '@/utils/api';
import toast from 'react-hot-toast';

const categories = ['All', 'React', 'Next.js', 'Django'];

const iconMap = {
  react: <FaReact />,
  node: <FaNodeJs />,
  nodejs: <FaNodeJs />,
  ethereum: <FaEthereum />,
  nextjs: <SiNextdotjs />,
  next: <SiNextdotjs />,
  mongodb: <SiMongodb />,
  typescript: <SiTypescript />,
  dialogflow: <SiDialogflow />,
  openai: <SiOpenai />,
  ipfs: <SiIpfs />,
  django: <SiDjango />,
};

export default function Projects({ limit = null }) {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        toast.error('Failed to fetch projects');
      }
    }
    fetchProjects();
  }, []);

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) =>
          p.icon_names?.some((icon) =>
            icon.toLowerCase().includes(active.toLowerCase().replace('.', ''))
          )
        );

  const limitedProjects = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-20 text-white relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-fuchsia-500 mb-4"
      >
        My Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-10 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto"
      >
        Code, creativity, and chaos — all in one place.
      </motion.p>

      <motion.div
        className="flex justify-center flex-wrap gap-3 mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-xs sm:text-sm rounded-full border font-medium transition-all duration-200 ${
              active === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/40'
                : 'border-purple-500 text-purple-400 hover:bg-purple-700/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, staggerChildren: 0.1 },
          },
        }}
      >
        <AnimatePresence>
          {limitedProjects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <motion.div
                layout
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900/40 border border-purple-700 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-md transition-all hover:shadow-purple-500/40 cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {project.icon_names?.map((name, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ rotate: 10, scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-purple-400 text-xl sm:text-2xl"
                    >
                      {iconMap[name.toLowerCase()] || null}
                    </motion.div>
                  ))}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-300 mb-3">
                  {project.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>

      {limit && filtered.length > limit && (
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-block text-neon-blue hover:text-blue-400 text-lg underline"
          >
            View All Projects →
          </Link>
        </div>
      )}
    </section>
  );
}
