import prisma from "@/prisma/db";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://www.tranqueira.shop";

  // Fetch all reviews
  const reviews = await prisma.review.findMany();

  // Map through the products to create the sitemap entries
  return reviews.map((review) => ({
    url: `${BASE_URL}/avaliacao/${review.categoryOneSlug}/${review.categoryTwoSlug}/${review.categoryThreeSlug}/${review.titleSlug}`,
    lastModified: review.createdAt.toISOString(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));
}
