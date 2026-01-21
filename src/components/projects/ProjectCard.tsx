import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  category: string;
  imageUrl?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="border rounded overflow-hidden hover:shadow-lg transition cursor-pointer group">
        {project.imageUrl && (
          <div className="overflow-hidden bg-gray-100">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        )}

        <div className="p-4">
          <p className="text-sm text-gray-600 font-medium">{project.category}</p>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-600 transition">{project.title}</h3>
        </div>
      </div>
    </Link>
  );
}
