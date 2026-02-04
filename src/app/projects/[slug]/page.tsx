"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Project } from "@/types/projects";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        const data = await res.json();
        if (res.ok && data.project) {
          setProject(data.project as Project);
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/projects" className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-8">
            <ChevronLeft size={20} />
            Back to Projects
          </Link>
          <div className="text-center text-gray-600">Project not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/projects" className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-8">
          <ChevronLeft size={20} />
          Back to Projects
        </Link>

        {/* Hero Image */}
        <div className="mb-12">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Project Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            
            <div className="flex gap-4 mb-8">
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            {project.description && (
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project.description}
              </p>
            )}

            {/* Project Stats */}
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category</dt>
                  <dd className="font-medium">{project.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Status</dt>
                  <dd className="font-medium">Completed</dd>
                </div>
                {project.createdAt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Date</dt>
                    <dd className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="bg-gray-50 p-8 rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4">About This Project</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                This project showcases our expertise in {project.category.toLowerCase()} construction and design.
              </p>
              <p>
                View all the project images below to see the quality of our work and attention to detail.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Inquire About Similar Work
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {project.images && project.images.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image) => (
                <div key={image.id} className="rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img
                    src={image.imageUrl}
                    alt="Project gallery"
                    className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-red-600 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8">
            Let's discuss how we can bring your vision to life with the same quality and expertise.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-3 bg-white text-red-600 font-semibold rounded hover:bg-gray-100 transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
