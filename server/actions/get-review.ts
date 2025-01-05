"use server";

import prisma from "@/prisma/db";

export const getReview = async (
  categoryOne: string,
  categoryTwo: string,
  categoryThree: string,
  title: string
): Promise<ReviewWithPriceAndRatingAsString | undefined> => {
  const review = await prisma.review.findFirst({
    where: {
      categoryOneSlug: categoryOne,
      categoryTwoSlug: categoryTwo,
      categoryThreeSlug: categoryThree,
      titleSlug: title,
    },
  });
  if (!review) return undefined;
  return {
    ...review,
    price: review.price.toString(),
    rating: review.rating.toString(),
  };
};
