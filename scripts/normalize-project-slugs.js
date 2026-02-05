#!/usr/bin/env node
/* One-off script to normalize project slugs in the database.
   Usage: node scripts/normalize-project-slugs.js
   Review changes before running in production. This script will update slugs to a URL-friendly format and append a numeric suffix when conflicts occur.
*/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function normalizeSlug(s) {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  const seen = new Set();

  for (const p of projects) {
    const normalized = normalizeSlug(p.slug || p.title || 'project');
    let candidate = normalized;
    let suffix = 1;
    while (seen.has(candidate) || (await prisma.project.findUnique({ where: { slug: candidate } }))) {
      candidate = `${normalized}-${suffix++}`;
    }

    if (candidate !== p.slug) {
      console.log(`Updating slug for project ${p.id}: "${p.slug}" -> "${candidate}"`);
      await prisma.project.update({ where: { id: p.id }, data: { slug: candidate } });
    }

    seen.add(candidate);
  }

  console.log('Done.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
