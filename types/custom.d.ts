import { Review } from "@prisma/client";
declare global {
  type ReviewWithoutPriceAndRating = Omit<Review, "price" | "rating">;
  type ReviewWithPriceAndRatingAsString = ReviewWithoutPriceAndRating & {
    price: string;
    rating: string;
  };
}

export default global;
