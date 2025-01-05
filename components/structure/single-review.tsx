import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";

interface SingleReviewProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function SingleReview({ review }: SingleReviewProps) {
  return (
    <>
      <Card className="max-w-screen-lg single-review">
        <CardHeader>
          <div className="bg-secondary text-center font-bold text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
          <div className="w-full flex flex-col items-end">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={review.imageSrc}
                alt={review.imageAlt}
                className="rounded-xs object-cover"
                fill
              />
            </AspectRatio>
            <div className="w-full">
              <h2 className="bg-primary text-white">
                {review.title.replaceAll('"', "")}
              </h2>
            </div>
            <Badge className="font-extrabold absolute mt-2 mr-2 z-50 bg-blue-400 hover:bg-blue-500 text-sm">
              R$ {review.price.replace(".", ",")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col relative">
          <div dangerouslySetInnerHTML={{ __html: review.reviewHTML }}></div>
        </CardContent>
        <CardFooter>
          <Link
            href={`/avaliacao/${review.categoryOneSlug}/${
              review.categoryTwoSlug
            }${
              review.categoryThreeSlug ? `/${review.categoryThreeSlug}` : ""
            }/${review.titleSlug}`}
          >
            <Button className="font-extrabold">Ler avaliação</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
