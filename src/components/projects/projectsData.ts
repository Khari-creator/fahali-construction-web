export type Project = {
  title: string;
  category: "Bungalows" | "Maisonettes" | "Apartments" | "Commercial";
  image: string;
  slug: string;
};

export const projects: Project[] = [
  {
    title: "Juba Bungalow (3BR)",
    category: "Bungalows",
    image: "/images/bungalow-1.jpg",
    slug: "juba-bungalow",
  },
  {
    title: "Kajiado Bungalow",
    category: "Bungalows",
    image: "/images/bungalow-2.jpg",
    slug: "kajiado-bungalow",
  },
  {
    title: "Modern Bunglow",
    category: "Bungalows",
    image: "/images/bungalow-3.jpg",
    slug: "modern-bunglow",
  },
  {
    title: "2 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-1.jpg",
    slug: "3br-maisonette",
  },

  {
    title: "4 Bedroom Villa",
    category: "Maisonettes",
    image: "/images/villa-2.jpg",
    slug: "4br-maisonette",
  },
  {
    title: "3 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-3.jpg",
    slug: "3br-maisonette-2",
  },
  {
    title: "5 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-4.jpg",
    slug: "5br-maisonette",
  },
  {
    title: "4 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-5.jpg",
    slug: "4br-maisonette",
  },
  {
    title: "Modern Maisonette",
    category: "Maisonettes",
    image: "/images/villa-6.jpg",
    slug: "modern-maisonette",
  },

];
