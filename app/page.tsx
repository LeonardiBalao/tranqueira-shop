import CarouselHero from "@/components/structure/carousel-hero";
import { SearchReview } from "@/components/structure/search-review";
import { getReviews } from "@/server/actions/get-reviews";

export default async function Home() {
  const allReviews = await getReviews();
  const reversedReviews = allReviews.reverse();
  return (
    <>
      <SearchReview allReviews={allReviews} />
      <CarouselHero allReviews={reversedReviews} />
    </>
  );
}
