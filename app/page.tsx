import CarouselHero from "@/components/structure/carousel-hero";
import Navbar from "@/components/structure/navbar";
import SearchBar from "@/components/structure/search-bar";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Navbar user={session?.user} />
      <SearchBar className="mb-12" />
      <CarouselHero />
    </>
  );
}
