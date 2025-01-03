import CarouselHero from "@/components/structure/carousel-hero";
import Navbar from "@/components/structure/navbar";
import SearchBar from "@/components/structure/search-bar";

export default async function Home() {
  return (
    <>
      <Navbar />
      <SearchBar className="m-12" />
      <CarouselHero />
    </>
  );
}
