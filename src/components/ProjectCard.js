'use client';
import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, stack, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#161638] border border-purple-500 rounded-2xl p-4 shadow-lg text-white"
    >
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-bold text-purple-400 mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 border border-purple-300 rounded-full text-purple-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
