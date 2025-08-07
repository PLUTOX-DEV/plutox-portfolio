'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getProjects } from '@/utils/api';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaReact, FaNodeJs, FaEthereum } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiMongodb,
  SiTypescript,
  SiDialogflow,
  SiOpenai,
  SiIpfs,
  SiDjango,
} from 'react-icons/si';
import toast from 'react-hot-toast';

// Icon map
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

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const allProjects = await getProjects();
        const found = allProjects.find((p) => p.slug === slug);
        if (!found) return notFound();
        setProject(found);
      } catch (error) {
        toast.error('Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  if (!project) return notFound();

  return (
    <motion.div
      className="p-6 md:p-10 text-white max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-neon-purple mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {project.title}
      </motion.h1>

      <motion.div
        className="mb-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={500}
          className="rounded-3xl shadow-xl border border-neon-purple"
        />
      </motion.div>

      <motion.p
        className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {project.description}
      </motion.p>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-neon-blue mb-3">Tech Stack</h2>
        <div className="flex items-center gap-5 flex-wrap">
          {project.icon_names?.map((name, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white text-4xl hover:text-neon-purple transition-all"
            >
              {iconMap[name.toLowerCase()] || null}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex gap-6 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-neon-purple hover:bg-purple-700 text-white py-2 px-5 rounded-xl shadow-lg transition-all duration-300"
          >
            <FaExternalLinkAlt />
            Live Site
          </a>
        )}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-neon-blue hover:bg-blue-700 text-white py-2 px-5 rounded-xl shadow-lg transition-all duration-300"
          >
            <FaGithub />
            GitHub
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
