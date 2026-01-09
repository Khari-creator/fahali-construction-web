import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0f3d2e",
          accent: "#f97316",
          dark: "#0b0f14",
        },
      },
    },
  },
  plugins: [],
};

export default config;
