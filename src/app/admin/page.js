'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getProjects } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaProjectDiagram, FaSignOutAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Auth Check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-auth') === 'true';
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  // 🚀 Fetch Projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        toast.error('Failed to load projects');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // 🔓 Logout
  function handleLogout() {
    localStorage.removeItem('admin-auth');
    router.push('/admin/login');
  }

  // 🌀 Loading State
  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-[#0a0a23] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.05, 1], rotate: [0, 360] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <div className="w-20 h-20 rounded-full border-4 border-purple-500 border-t-transparent animate-spin-slow shadow-neon" />
          <motion.p
            className="text-lg text-purple-300 font-mono"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Dashboard...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen px-6 py-12 text-white max-w-7xl mx-auto bg-[#0a0a23] animate-fade-in relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* 🔒 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-sm text-red-400 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
      >
        <FaSignOutAlt />
        Logout
      </button>

      <motion.h1
        className="text-4xl md:text-5xl font-bold neon-text glitch mb-12 text-center"
        data-text="Admin Dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* 🔢 Summary Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Total Projects */}
        <Link href="/admin/projects" className="group">
          <motion.div
            className="glass-card cursor-pointer border border-purple-500 bg-gradient-to-br from-purple-800/50 to-purple-900/20 p-6 rounded-2xl shadow-neon group-hover:shadow-purple-500/40 transition-all"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <FaProjectDiagram className="text-4xl text-purple-300 glow-pulse" />
              <h2 className="text-xl font-semibold text-purple-200 group-hover:text-neon-purple transition-colors">
                Total Projects
              </h2>
            </div>
            <p className="text-5xl font-bold text-purple-100 group-hover:text-neon-purple transition-colors">
              {projects.length}
            </p>
          </motion.div>
        </Link>

        {/* Add Project */}
        <motion.div
          className="glass-card border border-cyan-500 bg-gradient-to-br from-cyan-800/50 to-blue-900/20 p-6 rounded-2xl shadow-neon flex flex-col justify-between"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <FaPlus className="text-4xl text-cyan-300 glow-pulse" />
            <h2 className="text-xl font-semibold text-cyan-200">Add New Project</h2>
          </div>
          <Link
            href="/admin/projects/new"
            className="btn-glow text-center text-white mt-4"
          >
            + Add Project
          </Link>
        </motion.div>
      </div>

      {/* 🕓 Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-neon-purple mb-4">Recent Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-400 italic">No projects available yet.</p>
        ) : (
          <ul className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <li
                key={project.slug}
                className="glass-card border border-gray-700 hover:border-neon-purple p-4 rounded-xl transition-all hover:shadow-md hover:shadow-purple-500/40"
              >
                <Link
                  href={`/admin/projects/${project.slug}`}
                  className="text-lg font-medium text-white hover:text-neon-purple transition-all"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* 🗂️ All Projects */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-neon-blue mb-6 text-center md:text-left">
          All Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500 italic">No projects to display.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="glass-card p-5 border border-purple-700 hover:border-neon-purple rounded-xl transition-all hover:shadow-xl hover:shadow-purple-500/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-neon-blue">{project.title}</h3>
                  <span className="text-xs text-gray-400">{project.slug}</span>
                </div>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                <Link
                  href={`/admin/projects/edit/${project.slug}`}
                  className="block text-center mt-3 btn-glow text-white py-2 px-4 rounded-lg hover:bg-purple-800/40"
                >
                  Edit Project
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
