import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fahalibuilders.com";

    // static routes
    const staticUrls = [
      "",
      "projects",
      "about",
      "contact",
      "services",
    ];

    // Note: schema defines `createdAt` but not `updatedAt` for Project
    const projects = await prisma.project.findMany({ select: { slug: true, createdAt: true } });

    const urls = [];

    for (const p of projects) {
      const lastmod = new Date(p.createdAt).toISOString();
      urls.push({ loc: `${siteUrl}/projects/${encodeURIComponent(p.slug)}`, lastmod });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls
        .map((u) => {
          const loc = `${siteUrl}/${u}`.replace(/\/$/, "");
          return `<url><loc>${loc}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`;
        })
        .join("")}
      ${urls
        .map(
          (u) => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`
        )
        .join("")}
    </urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Failed to generate sitemap", err);
    return new NextResponse("", { status: 500 });
  }
}
