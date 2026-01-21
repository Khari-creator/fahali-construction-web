export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  description?: string | null;
  featured?: boolean;
  createdAt: string; // comes as ISO string from API
}