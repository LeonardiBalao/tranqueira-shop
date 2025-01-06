import SingleReview from "@/components/structure/single-review";
import { getReview } from "@/server/actions/get-review";
import { redirect } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Aside from "@/components/structure/aside";
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
  const { categoryOne, categoryTwo, categoryThree, title } = await params;
  const review = await getReview(
    categoryOne,
    categoryTwo,
    categoryThree,
    title
  );
  if (!review) return <div>Não encontrado</div>;
  return (
    <main className="container mx-auto px-8 md:px-0 flex flex-col gap-4 items-center border border-red-500">
      <nav className="mr-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <article className="container max-w-screen-lg">
        <section className="flex flex-col md:flex-row md:gap-8">
          <SingleReview review={review} />
          <Aside className="hidden md:block max-w-[320px]" />
        </section>
      </article>
    </main>
  );
}
