import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const project = await prisma.project.upsert({
    where: { slug: "4-bedroom-bungalow" },
    update: {
      title: "4 Bedroom Bungalow",
      category: "Bungalows",
      imageUrl: "https://via.placeholder.com/1200x800",
      description: "Updated via Prisma seed",
    },
    create: {
      title: "4 Bedroom Bungalow",
      slug: "4-bedroom-bungalow",
      category: "Bungalows",
      imageUrl: "https://via.placeholder.com/1200x800",
      description: "Seeded via Prisma adapter-pg",
    },
  });

  console.log("Seeded project:", project);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
