const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL not set in env');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const ts = Date.now();
  const slug = `test-project-${ts}`;
  const project = await prisma.project.create({
    data: {
      title: `Test Project ${ts}`,
      slug,
      category: 'Testing',
      imageUrl: 'https://via.placeholder.com/1200x800',
      description: 'Inserted by test script',
    },
  });

  console.log('Created project:', project);

  const fetched = await prisma.project.findUnique({ where: { slug }, include: { images: true } });
  console.log('Fetched project:', fetched);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
