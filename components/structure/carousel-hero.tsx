"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CarouselReview from "./carousel-review";

interface CarouselHeroProps {
  allReviews: ReviewWithPriceAndRatingAsString[];
}

export default function CarouselHero({ allReviews }: CarouselHeroProps) {
  return (
    <main className="container px-12 md:px-0 flex flex-col mt-8 justify-center border-red-500">
      <h3 className="font-bold text-xl text-primary mb-4 w-full mx-auto">
        Nossas Avaliações
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {allReviews.map((review: ReviewWithPriceAndRatingAsString, index) => (
            <CarouselItem key={index} className={"md:basis-1/3"}>
              <CarouselReview review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </main>
  );
}
