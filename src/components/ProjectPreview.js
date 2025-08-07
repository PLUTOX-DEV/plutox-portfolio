'use client';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'CryptoTracker',
    description: 'Real-time insights into digital currencies.',
    image: '/images/crypto.jpg', // Replace with your local assets
    stack: ['React', 'Next.js', 'TypeScript'],
  },
  {
    title: 'AI Image Generator',
    description: 'Create unique visuals using AI.',
    image: '/images/ai.jpg',
    stack: ['React', 'OpenAI', 'Tailwind'],
  },
  {
    title: 'DevConnect',
    description: 'Social platform for developers.',
    image: '/images/dev.jpg',
    stack: ['MongoDB', 'Next.js', 'Node.js'],
  },
];

export default function ProjectPreview() {
  return (
    <section className="px-6 md:px-16 py-20 bg-[#0a0a23] text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-10">My Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
