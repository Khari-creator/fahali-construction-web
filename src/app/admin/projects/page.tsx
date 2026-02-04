"use client";

import { useEffect, useState } from "react";
import { Project, ProjectImage } from "@/types/projects";

// Local form type - uses 'image' for internal handling
type AdminProject = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  image: string; // hero image url
  featured?: boolean;
  description?: string | null;
  images?: ProjectImage[];
};

const emptyProject: AdminProject = {
  slug: "",
  title: "",
  category: "Bungalows",
  image: "",
  featured: false,
  description: null,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<AdminProject | null>(null);
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
    try {
      const res = await fetch("/api/projects", {
        method: exists ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          exists
            ? { slug: editing.slug, data: projectData }
            : projectData
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save project");
        setSaving(false);
        return;
      }

      // If created or updated, reload projects and keep modal open with fresh data
      await loadProjects();

      // If API returned the project object, use it to update editing state (so we have `id` and `images`)
      const returnedProject: Project | undefined = data.project as Project | undefined;

      if (returnedProject) {
        setEditing({
          id: returnedProject.id,
          slug: returnedProject.slug,
          title: returnedProject.title,
          category: returnedProject.category,
          image: returnedProject.imageUrl,
          featured: returnedProject.featured,
          description: returnedProject.description,
          images: returnedProject.images || [],
        });
      } else {
        // fallback: close modal
        setEditing(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
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
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    // Accept either `url` (server) or `path` (legacy)
    const url = (data && (data.url || data.path)) as string | undefined;

    if (!url) {
      alert("Upload failed");
      return;
    }

    // If editing an existing project (has id), add this image as a gallery image
    if (editing && editing.id) {
      // If the file was intended as hero image, set editing.image as well
      setEditing(prev => prev ? { ...prev, image: url } : prev);

      try {
        const imgRes = await fetch("/api/projects/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId: editing.id, imageUrl: url }),
        });

        const imgData = await imgRes.json();

        if (!imgRes.ok) {
          alert(imgData.error || "Failed to add project image");
        } else {
          // Refresh projects and update current editing images
          await loadProjects();
          setEditing(prev => {
            if (!prev) return prev;
            const updated = { ...prev };
            updated.images = updated.images ? [...updated.images, imgData.image] : [imgData.image];
            return updated;
          });
        }
      } catch (err) {
        console.error(err);
        alert("Failed to save project image");
      }
    } else {
      // Not yet created project: just set hero image preview and ask user to save first for gallery
      setEditing(prev => prev ? { ...prev, image: url } : prev);
    }
  };

  const deleteImage = async (imageId: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch("/api/projects/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete image");
        return;
      }

      await loadProjects();
      setEditing(prev => {
        if (!prev) return prev;
        return { ...prev, images: prev.images?.filter(i => i.id !== imageId) } as AdminProject;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
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
                onClick={() => setEditing({
                  id: p.id,
                  slug: p.slug,
                  title: p.title,
                  category: p.category,
                  image: p.imageUrl,
                  featured: p.featured,
                  description: p.description,
                  images: p.images || [],
                })}
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

            {/* Description */}
            <textarea
              placeholder="Description"
              value={editing.description || ""}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="w-full border p-2 h-24"
            />

            {/* Gallery (only for saved projects) */}
            {editing.id ? (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Project Images</h3>
                {editing.images && editing.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {editing.images.map(img => (
                      <div key={img.id} className="relative">
                        <img src={img.imageUrl} className="h-24 w-full object-cover rounded" />
                        <button
                          onClick={() => deleteImage(img.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No gallery images yet. Upload an image to add one.</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600 mt-2">Save the project first to add gallery images.</p>
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
