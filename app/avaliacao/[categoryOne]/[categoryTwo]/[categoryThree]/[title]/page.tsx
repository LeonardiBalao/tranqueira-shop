import SingleReview from "@/components/structure/single-review";
import { getReview } from "@/server/actions/get-review";
import Aside from "@/components/structure/aside";
import { Metadata } from "next";
import prisma from "@/prisma/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    categoryOne: string;
    categoryTwo: string;
    categoryThree: string;
    title: string;
  }>;
}): Promise<Metadata> {
  const { categoryOne, categoryTwo, categoryThree, title } = await params;
  const review = await prisma.review.findFirst({
    where: {
      categoryOneSlug: categoryOne,
      categoryTwoSlug: categoryTwo,
      categoryThreeSlug: categoryThree,
      titleSlug: title,
    },
  });

  return {
    title: `${review?.title}`,
    description: `${review?.metaDescription}`,
    keywords: review?.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    authors: [
      {
        name: "Tranqueira Shop",
        url: "https://tranqueira.shop",
      },
    ],
  };
}

export default async function SingleReviewPage({
  params,
}: {
  params: Promise<{
    categoryOne: string;
    categoryTwo: string;
    categoryThree: string;
    title: string;
  }>;
}) {
  const { categoryOne, categoryTwo, categoryThree, title } = await params;

  const review = await getReview(
    categoryOne,
    categoryTwo,
    categoryThree,
    title
  );

  if (!review) return <div>Não encontrado</div>;
  return (
    <main className="container mx-auto px-8 md:px-0 flex flex-col gap-4 items-center my-8">
      <article className="container max-w-screen-lg">
        <section className="flex flex-col md:flex-row md:gap-8">
          <SingleReview review={review} />
          <Aside className="hidden md:block max-w-[320px]" />
        </section>
      </article>
    </main>
  );
}
