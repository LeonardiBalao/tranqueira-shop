"use client";

import { StarHalfIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";

interface RatingProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function Rating({ review }: RatingProps) {
  const fullStars = Math.floor(parseFloat(review.rating));
  const hasHalfStar = parseFloat(review.rating) % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex gap-2 items-center justify-center">
      <Badge className="flex gap-1">
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`full-${index}`} size={18} fill="yellow" />
          ))}
        {hasHalfStar && <StarHalfIcon size={18} fill="yellow" />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`empty-${index}`} size={18} />
          ))}
        {review.rating}
      </Badge>
      <Badge variant={"outline"} className="text-xs flex gap-2">
        {review.ordersAmount} vendidos
      </Badge>
      <Badge variant={"outline"} className="text-xs flex gap-2 ">
        {review.reviewsAmount} avaliados
      </Badge>
    </div>
  );
}
