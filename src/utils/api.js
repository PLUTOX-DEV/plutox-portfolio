const BASE_URL = 'http://localhost:8000/api/projects/';

// ✅ GET all projects
export async function getProjects() {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

// ✅ GET project by slug
export async function getProjectBySlug(slug) {
  const res = await fetch(`${BASE_URL}${slug}/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
}

// ✅ CREATE a new project (FormData)
export async function createProject(formData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: formData, // 👈 Raw FormData (for file upload)
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('❌ Error from backend:', errorData);
    throw new Error('Failed to create project');
  }

  return res.json();
}

// ✅ UPDATE project by slug (FormData)
export async function updateProject(slug, formData) {
  const res = await fetch(`${BASE_URL}${slug}/`, {
    method: 'PUT',
    body: formData, // 👈 Raw FormData (no headers needed)
    // Do NOT set Content-Type manually!
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('❌ Update error:', errorData);
    throw new Error('Failed to update project');
  }

  return res.json();
}

// ✅ DELETE project by slug
export async function deleteProject(slug) {
  const res = await fetch(`${BASE_URL}${slug}/`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      console.error('❌ Delete error:', errorData);
    } catch (err) {
      console.error('❌ Delete error (no JSON):', err);
    }
    throw new Error('Failed to delete project');
  }

  if (res.status === 204) return { success: true };

  try {
    return await res.json();
  } catch {
    return { success: true };
  }
}