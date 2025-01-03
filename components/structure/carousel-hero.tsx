"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Product from "./product";

const products = [
  {
    title: "Product Title",
    imageAlt: "Product Image",
    imageUrl: "https://via.placeholder.com/450x250",
    description: "Product Description",
    content: "Product Content",
    footer: "Product Footer",
  },
  {
    title: "Product Title",
    imageAlt: "Product Image",
    imageUrl: "https://via.placeholder.com/450x250",
    description: "Product Description",
    content: "Product Content",
    footer: "Product Footer",
  },
  {
    title: "Product Title",
    imageAlt: "Product Image",
    imageUrl: "https://via.placeholder.com/450x250",
    description: "Product Description",
    content: "Product Content",
    footer: "Product Footer",
  },
];

export default function CarouselHero() {
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
    <main className="container px-8 md:px-0">
      <Carousel
        orientation={orientation}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full "
      >
        <CarouselContent>
          {products.map((item, index) => (
            <CarouselItem
              key={index}
              className={orientation === "vertical" ? "" : "basis-1/3"}
            >
              <Product
                title={item.title}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
                description={item.description}
                content={item.content}
                footer={item.footer}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </main>
  );
}
