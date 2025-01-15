"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CarouselReview from "./carousel-review";
import { cn } from "@/lib/utils";

interface CarouselHeroProps {
  allReviews: ReviewWithPriceAndRatingAsString[];
}

export default function CarouselHero({ allReviews }: CarouselHeroProps) {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOrientation("vertical");
      } else {
        setOrientation("horizontal");
      }
    };

    // Set the initial orientation
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="container px-8 md:px-0 mt-10 md:mt-0">
      <Carousel
        orientation={orientation}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {allReviews.map((review: ReviewWithPriceAndRatingAsString, index) => (
            <CarouselItem
              key={index}
              className={cn(
                orientation === "vertical" ? "basis-1/3" : "basis-1/3"
              )}
            >
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
