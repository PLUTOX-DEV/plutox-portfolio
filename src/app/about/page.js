'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiNextdotjs, SiTailwindcss, SiDjango, SiReact } from 'react-icons/si';
import { FaServer } from 'react-icons/fa'; // For REST API icon

const techSkills = [
  { icon: <SiReact />, label: 'React', level: 40 },
  { icon: <SiNextdotjs />, label: 'Next.js', level: 30 },
  { icon: <SiDjango />, label: 'Django', level: 80 },
  { icon: <SiTailwindcss />, label: 'Tailwind CSS', level: 90 },
  { icon: <FaServer />, label: 'REST API', level: 70 },
];

export default function About() {
  return (
    <section id='about' className="min-h-screen px-6 sm:px-12 md:px-24 py-20 text-white">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left: About Text & Skills */}
        <div className="flex-1">
          {/* About Me Heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-purple-400 mb-2">About Me</h2>
            <p className="text-lg text-zinc-300 max-w-3xl">
              I’m Plutox — a passionate software engineer crafting stunning apps using the latest technologies.
              I build smooth, performant, and creative experiences using <span className="text-purple-300">DRS</span>,
              <span className="text-purple-300"> Tailwind CSS</span>, and <span className="text-purple-300">React</span>.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-purple-300 mb-6">Tech Stack</h3>
            <div className="space-y-6">
              {techSkills.map((skill, i) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true });

                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-zinc-800/60 border border-purple-700 rounded-lg px-4 py-3"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2 text-purple-400">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-sm">{skill.label}</span>
                      </div>
                      <span className="text-sm text-zinc-300">{skill.level}%</span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="h-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right: Avatar/Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="/avatar.png"
            alt="Plutox's Profile"
            className="rounded-full w-48 h-48 object-cover shadow-lg shadow-purple-500/30 border-2 border-purple-600"
          />
        </motion.div>
      </div>
    </section>
  );
}
