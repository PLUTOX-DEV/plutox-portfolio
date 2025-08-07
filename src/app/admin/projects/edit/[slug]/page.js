'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getProjectBySlug,
  updateProject,
  deleteProject
} from '@/utils/api';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error(err);
        toast.error('❌ Failed to fetch project.');
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  const handleEdit = async (formData) => {
    try {
      setUpdating(true);
      await updateProject(slug, formData); // Use FormData
      toast.success('✅ Project updated!');
      router.push('/admin/projects');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update project.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setDeleting(true);
      await deleteProject(slug);
      toast.success('🗑️ Project deleted!');
      router.push('/admin/projects');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete project.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-purple-300">Loading project...</p>;
  }

  if (!project) {
    return <p className="text-center mt-10 text-red-500">Project not found.</p>;
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Edit Project</h1>

      <ProjectForm initialData={project} onSubmit={handleEdit} loading={updating} />

      <button
        onClick={handleDelete}
        disabled={deleting}
        className={`mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-md transition-all ${
          deleting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {deleting ? 'Deleting...' : 'Delete Project'}
      </button>
    </div>
  );
}
