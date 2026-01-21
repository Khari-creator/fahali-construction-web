export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  description?: string | null;
  featured?: boolean;
  images?: ProjectImage[];
  createdAt: string;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  createdAt: string;
}