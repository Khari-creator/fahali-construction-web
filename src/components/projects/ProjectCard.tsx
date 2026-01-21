type Project = {
  slug: string;
  title: string;
  category: string;
  imageUrl?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded overflow-hidden hover:shadow-lg transition">
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-56 w-full object-cover"
        />
      )}

      <div className="p-4">
        <p className="text-sm text-gray-600 font-medium">{project.category}</p>
        <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
      </div>
    </div>
  );
}
