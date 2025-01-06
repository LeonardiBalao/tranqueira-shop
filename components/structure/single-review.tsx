"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { Button } from "../ui/button";
import VideoPlayer from "./react-player";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { AuthorBox } from "./author-box";
import Rating from "./rating";
import { Separator } from "../ui/separator";
import CardAffiliate from "./card-affiliate";

interface SingleReviewProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function SingleReview({ review }: SingleReviewProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-4 flex-wrap w-full single-review">
      <h1 className="text-lg md:text-3xl font-bold">{review.title}</h1>
      <p className="text-sm">{review.metaDescription.split(".")[0]}.</p>
      <Rating review={review} />
      <div className="w-full">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={review.imageSrc}
            alt={review.imageAlt}
            className="rounded-2xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </AspectRatio>
      </div>
      <AuthorBox review={review} />
      <Separator />
      <section>
        <h2 className="font-bold">Avaliação</h2>
        <p>{review.customerExperience}</p>
        <CardAffiliate review={review} />
        <h2 className="font-bold text-green-700">Pontos positivos</h2>
        <ul>
          {review.pros.map((pro, index) => (
            <li key={index}>{pro}</li>
          ))}
        </ul>
        <h2 className="font-bold text-red-500">Pontos negativos</h2>
        <ul>
          {review.cons.map((con, index) => (
            <li key={index}>{con}</li>
          ))}
        </ul>
      </section>
      <h2 className="font-bold">Custo-Benefício</h2>
      <p>{review.costBenefit}</p>
      <h2 className="font-bold">Conclusão</h2>
      <p>{review.finalConsiderations}</p>
      <Link href={review.affiliateLink}>
        <Button className="w-full" size={"lg"}>
          Leve-me para o site
        </Button>
      </Link>
    </div>
  );
}
