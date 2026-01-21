"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/projects";

const emptyProject: Project = {
  slug: "",
  title: "",
  category: "Bungalows",
  image: "",
  featured: false,
  description: null,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  /* ---------------- LOAD PROJECTS ---------------- */
  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      await loadProjects();
    };
    fetchProjects();
  }, []);

  /* ---------------- SAVE PROJECT ---------------- */
  const saveProject = async () => {
    if (!editing) return;

    if (!editing.slug || !editing.title || !editing.image) {
      alert("Slug, title and image are required");
      return;
    }

    setSaving(true);

    const exists = projects.some(p => p.slug === editing.slug);
    
    // Map the form data to API schema
    const projectData = {
      title: editing.title,
      slug: editing.slug,
      category: editing.category,
      imageUrl: editing.image,
      description: editing.description || null,
      featured: editing.featured || false,
    };

    await fetch("/api/projects", {
      method: exists ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        exists
          ? { slug: editing.slug, data: projectData }
          : projectData
      ),
    });

    setSaving(false);
    setEditing(null);
    loadProjects();
  };

  /* ---------------- DELETE ---------------- */
  const deleteProject = async (slug: string) => {
    if (!confirm("Delete this project?")) return;

    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });

    loadProjects();
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setEditing(prev => prev ? { ...prev, image: data.path } : prev);
  };

  return (
    <main className="max-w-5xl mx-auto py-20 px-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Projects CMS</h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => setEditing({ ...emptyProject })}
        className="mb-10 px-4 py-2 bg-white text-black"
      >
        + Add Project
      </button>

      {/* PROJECT LIST */}
      <div className="space-y-6">
        {projects.map(p => (
          <div
            key={p.slug}
            className="border border-gray-700 p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-gray-400">
                {p.category} • {p.featured ? "Featured" : "Normal"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditing(p)}
                className="px-3 py-1 border"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(p.slug)}
                className="px-3 py-1 bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 w-full max-w-md space-y-4">
            <h2 className="font-bold text-xl">
              {projects.some(p => p.slug === editing.slug)
                ? "Edit Project"
                : "Add Project"}
            </h2>

            <input
              placeholder="Slug (unique)"
              value={editing.slug}
              onChange={e =>
                setEditing({ ...editing, slug: e.target.value })
              }
              className="w-full border p-2"
            />

            <input
              placeholder="Title"
              value={editing.title}
              onChange={e =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full border p-2"
            />

            <select
              value={editing.category}
              onChange={e =>
                setEditing({
                  ...editing,
                  category: e.target.value as Project["category"],
                })
              }
              className="w-full border p-2"
            >
              <option>Bungalows</option>
              <option>Maisonettes</option>
              <option>Apartments</option>
              <option>Commercial</option>
            </select>

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={e =>
                e.target.files && uploadImage(e.target.files[0])
              }
            />

            {editing.image && (
              <img
                src={editing.image}
                className="h-32 w-full object-cover"
              />
            )}

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={e =>
                  setEditing({
                    ...editing,
                    featured: e.target.checked,
                  })
                }
              />
              Show on homepage
            </label>

            <div className="flex gap-3 pt-4">
              <button
                onClick={saveProject}
                disabled={saving}
                className="flex-1 bg-black text-white py-2"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 border py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
