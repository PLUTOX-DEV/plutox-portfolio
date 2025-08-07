'use client';

import { motion } from 'framer-motion';
import { SiDjango } from 'react-icons/si';
import { FaTelegramPlane } from 'react-icons/fa';

const experiences = [
  {
    title: 'Backend Developer',
    company: 'AlphaDAO',
    date: 'July 2025 – Present',
    description: 'Built decentralized community tools and systems for DAO infrastructure.',
    icon: <SiDjango className="text-green-400 text-xl" />,
  },
  {
    title: 'Backend Developer',
    company: 'Nakabozozo (Telegram NFT Project)',
    date: 'May 2025 – June 2024',
    description: 'Built a Tap-to-Earn experience for an NFT collection on Base, deployed via Telegram.',
    icon: <FaTelegramPlane className="text-sky-400 text-xl" />,
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="min-h-screen py-20 px-6 sm:px-12 md:px-24">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-purple-400 mb-12 text-center"
      >
        Experience
      </motion.h2>

      <div className="relative border-l-4 border-purple-600/30 pl-6 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-purple-500 shadow-md shadow-purple-700/40 border-2 border-[#0a0a23]" />

            {/* Glass Card */}
            <div className="bg-zinc-900/50 border border-purple-700 backdrop-blur-md rounded-xl p-5 shadow-lg hover:shadow-purple-700/30 transition duration-300">
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                {exp.icon}
                <span className="uppercase text-sm tracking-wide font-medium">{exp.company}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">{exp.title}</h3>
              <p className="text-sm text-purple-200 mb-2">{exp.date}</p>
              <p className="text-sm text-zinc-300">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
