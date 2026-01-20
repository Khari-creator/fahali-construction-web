type Project = {
  slug: string;
  title: string;
  category: string;
  image?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded overflow-hidden hover:shadow-lg transition">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="h-56 w-full object-cover"
        />
      )}

      <div className="p-4">
        <p className="text-sm text-gray-500">{project.category}</p>
        <h3 className="font-semibold text-lg">{project.title}</h3>
      </div>
    </div>
  );
}
