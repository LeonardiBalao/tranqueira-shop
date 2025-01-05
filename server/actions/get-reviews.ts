"use server";

import prisma from "@/prisma/db";

export const getReviews = async () => {
  const reviews = await prisma.review.findMany();
  if (!reviews) {
    return [];
  }

  const formattedReviews = reviews.map((review) => {
    return {
      ...review,
      price: review.price.toString(),
      rating: review.rating.toString(),
    };
  });
  return formattedReviews;
};
