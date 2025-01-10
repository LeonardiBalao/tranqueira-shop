import CarouselHero from "@/components/structure/carousel-hero";
import { Combobox } from "@/components/structure/combobox";
import { getReviews } from "@/server/actions/get-reviews";

export default async function Home() {
  const allReviews = await getReviews();
  return (
    <>
      <Combobox allReviews={allReviews} />
      <CarouselHero allReviews={allReviews} />
    </>
  );
}
