'use client';

import ProjectForm from '@/components/admin/ProjectForm';
import { createProject } from '@/utils/api';

export default function NewProjectPage() {
  const handleCreate = async (data) => {
    try {
      const response = await createProject(data);
      console.log('Created project:', response);
    } catch (err) {
      console.error('❌ Error creating project:', err);
    }
  };

  return <ProjectForm onSubmit={handleCreate} />;
}
// This page allows admins to create a new project using the ProjectForm component.
// It handles form submission and API interaction to create a new project.
// The handleCreate function sends the form data to the backend and handles success/error responses.
// Make sure to adjust the API endpoint in utils/api/projects.js if needed.
// This code is a client-side component that uses the ProjectForm to create new projects.
// It imports necessary functions and components, handles form submission, and provides feedback to the user.