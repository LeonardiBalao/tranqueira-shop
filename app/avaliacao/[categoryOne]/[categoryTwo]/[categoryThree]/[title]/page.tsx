import SingleReview from "@/components/structure/single-review";
import { getReview } from "@/server/actions/get-review";
import { redirect } from "next/navigation";

interface SingleReviewProps {
  params: {
    categoryOne: string;
    categoryTwo: string;
    categoryThree: string;
    title: string;
  };
}

export default async function SingleReviewPage({ params }: SingleReviewProps) {
  if (!params) return redirect("/");
  const review = await getReview(
    params.categoryOne,
    params.categoryTwo,
    params.categoryThree,
    params.title
  );
  if (!review) return <div>Não encontrado</div>;
  return (
    <div className="px-8">
      <SingleReview review={review} />
    </div>
  );
}
