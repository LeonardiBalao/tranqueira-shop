"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface ReviewProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function CarouselReview({ review }: ReviewProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="bg-secondary text-center font-bold text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
          <div className="w-full mb-6 flex flex-col items-end">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={review.imageSrc}
                alt={review.imageAlt}
                className="rounded-xs object-cover"
                fill
              />
            </AspectRatio>
            <Badge className="font-bold absolute mt-2 mr-2 z-50 bg-blue-400 hover:bg-blue-500 text-sm">
              R$ {review.price.replace(".", ",")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <h2>{review.title.replaceAll('"', "")}</h2>
        </CardContent>
        <CardFooter className="w-full">
          <Link
            className="w-full"
            href={`/avaliacao/${review.categoryOneSlug}/${
              review.categoryTwoSlug
            }${
              review.categoryThreeSlug ? `/${review.categoryThreeSlug}` : ""
            }/${review.titleSlug}`}
          >
            <Button className="font-bold w-full">Ler avaliação</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
