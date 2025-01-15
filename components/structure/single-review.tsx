"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { AuthorBox } from "./author-box";
import Rating from "./rating";
import { Separator } from "../ui/separator";
import CardAffiliate from "./card-affiliate";
import VideoPlayer from "./react-player";

interface SingleReviewProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function SingleReview({ review }: SingleReviewProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-4 flex-wrap w-full single-review">
      <h1 className="text-lg md:text-3xl font-bold">{review.title}</h1>
      <p className="text-sm leading-3">{review.metaDescription}.</p>
      <Rating review={review} />
      <div className="w-full">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={review.imageSrc}
            alt={review.imageAlt}
            className="rounded-2xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
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
        <ul className="flex flex-col gap-2">
          {review.pros.map((pro, index) => (
            <li key={index}>{pro.slice(0, 1).toUpperCase() + pro.slice(1)}</li>
          ))}
        </ul>
        <h2 className="font-bold text-red-600">Pontos negativos</h2>
        <ul>
          {review.cons.map((con, index) => (
            <li key={index}>{con.slice(0, 1).toUpperCase() + con.slice(1)}</li>
          ))}
        </ul>
      </section>

      {review.videoSrc !== null && <VideoPlayer url={review.videoSrc} />}
      <div className="flex italic w-full justify-center">
        <span className="-mt-2">
          Assista ao vídeo acima e conheça o produto
        </span>
      </div>
      <h2 className="font-bold">Custo-Benefício</h2>
      <p>{review.costBenefit}</p>
      <h2 className="font-bold">Conclusão</h2>
      <p>{review.finalConsiderations}</p>
      <Link href={review.affiliateLink}>
        <Button className="w-full" size={"lg"}>
          Ir para o produto
        </Button>
      </Link>
    </div>
  );
}
