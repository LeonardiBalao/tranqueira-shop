import CarouselHero from "@/components/structure/carousel-hero";
import SearchBar from "@/components/structure/search-bar";
import { getReviews } from "@/server/actions/get-reviews";

export default async function Home() {
  const allReviews = await getReviews();
  return (
    <>
      <SearchBar className="mb-8" />
      <CarouselHero allReviews={allReviews} />
    </>
  );
}
