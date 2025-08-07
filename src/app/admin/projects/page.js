'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt, FaProjectDiagram } from 'react-icons/fa';
import { getProjects, deleteProject } from '@/utils/api';

export default function AdminProjectsPage() {
  const gridRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleScrollToProjects = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id, slug) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    try {
      setDeletingSlug(slug);
      await deleteProject(slug);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('🗑️ Project deleted!');
    } catch (error) {
      toast.error('❌ Failed to delete project');
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <motion.div
      className="min-h-screen px-6 py-10 text-white max-w-6xl mx-auto bg-[#0a0a23]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold neon-text glitch mb-12 text-center"
        data-text="Manage Projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Manage Projects
      </motion.h1>

      <motion.div
        className="mb-12 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleScrollToProjects}
          className="w-full md:w-1/2 neon-border-glow p-6 rounded-2xl bg-gradient-to-br from-purple-900 to-purple-700 text-center hover:shadow-neon transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-4">
            <FaProjectDiagram className="text-3xl text-neon-blue" />
            <div>
              <p className="text-xl font-bold">{projects.length} Projects</p>
              <p className="text-sm text-purple-200">Click to manage them all</p>
            </div>
          </div>
        </button>
      </motion.div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center col-span-full text-purple-300">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-card border border-purple-600 bg-gradient-to-br from-[#1c1c3c] to-[#2a1b3d] rounded-2xl p-5 hover:shadow-neon hover:border-neon-purple transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-neon-blue">{project.title}</h2>
                <span className="text-xs text-gray-400">{project.slug}</span>
              </div>

              <p className="text-gray-300 text-sm mb-6 line-clamp-3">{project.description}</p>

              <div className="flex justify-end gap-3 mt-4">
                <Link
                  href={`/admin/projects/edit/${project.slug}`}
                  className="flex items-center gap-2 text-sm bg-neon-blue hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow hover:shadow-blue-500/30"
                >
                  <FaEdit className="text-white" />
                  <span>Edit</span>
                </Link>

                <button
                  disabled={deletingSlug === project.slug}
                  onClick={() => handleDelete(project.id, project.slug)}
                  className={`flex items-center gap-2 text-sm bg-red-700 hover:bg-red-800 px-4 py-2 rounded-xl transition-all shadow hover:shadow-red-500/30 ${
                    deletingSlug === project.slug ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaTrashAlt className="text-white" />
                  <span>{deletingSlug === project.slug ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
