'use client';

import { motion } from 'framer-motion';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiDjango,
} from 'react-icons/si';
import { FaServer } from 'react-icons/fa'; // REST API icon

const skills = [
  {
    name: 'Tailwind CSS',
    level: 90,
    icon: <SiTailwindcss className="text-xl text-sky-400" />,
  },
  {
    name: 'Django',
    level: 80,
    icon: <SiDjango className="text-xl text-green-500" />,
  },
  {
    name: 'REST API',
    level: 70,
    icon: <FaServer className="text-xl text-orange-400" />,
  },
  {
    name: 'React',
    level: 40,
    icon: <SiReact className="text-xl text-cyan-400" />,
  },
  {
    name: 'Next.js',
    level: 30,
    icon: <SiNextdotjs className="text-xl text-white" />,
  },
];

export default function Skills() {
  return (
    <section className="px-6 md:px-16 py-20 bg-[#0a0a23] text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-10">Skills</h2>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center text-sm mb-1">
              <div className="flex items-center gap-2">
                {skill.icon}
                <span>{skill.name}</span>
              </div>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="h-full bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
