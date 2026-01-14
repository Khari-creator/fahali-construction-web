export type Project = {
  slug: string;
  title: string;
  category: "Bungalows" | "Maisonettes" | "Apartments" | "Commercial";
  image: string;
  featured: boolean; // 👈 IMPORTANT
};

