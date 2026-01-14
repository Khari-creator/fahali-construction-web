// components/projects/projectsData.ts

export type Project = {
  slug: string;
  title: string;
  category: "Bungalows" | "Maisonettes" | "Apartments" | "Commercial";
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "juba-bungalow",
    title: "Juba Bungalow (3BR)",
    category: "Bungalows",
    image: "/images/bungalow-1.jpg",
    featured: true,
  },
  {
    slug: "kajiado-bungalow",
    title: "Kajiado Bungalow",
    category: "Bungalows",
    image: "/images/bungalow-2.jpg",
    featured: true,
  },
  {
    slug: "modern-bungalow",
    title: "Modern Bungalow",
    category: "Bungalows",
    image: "/images/bungalow-3.jpg",
  },
  {
    slug: "3br-maisonette",
    title: "3 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-1.jpg",
    featured: true,
  },
  {
    slug: "4br-maisonette",
    title: "4 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-2.jpg",
  },
];
