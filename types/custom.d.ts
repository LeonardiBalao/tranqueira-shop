import { Review } from "@prisma/client";
declare global {
  type ReviewWithoutPriceAndRating = Omit<Review, "price" | "rating">;
  type ReviewWithPriceAndRatingAsString = ReviewWithoutPriceAndRating & {
    price: string;
    rating: string;
  };
  interface Form {
    name: string;
    discount: string;
    price: string;
    imageAlt: string;
    imageSrc: string;
    imageAlt2: string;
    imageSrc2: string;
    videoSrc?: string;
    categoryOne: string;
    categoryTwo: string;
    categoryThree?: string;
    description: string;
    affiliateLink: string;
    rating: string;
    reviewsAmount: string;
    ordersAmount: string;
  }
  interface PromptState {
    prompt: string;
    response: string;
  }

  interface States {
    title: PromptState;
    metaDescription: PromptState;
    customerExperience: PromptState;
    pros: PromptState;
    cons: PromptState;
    costBenefit: PromptState;
    finalConsiderations: PromptState;
    keywords: PromptState;
  }

  interface RequiredPrompts {
    cons?: string;
    pros?: string;
    costBenefit?: string;
  }
}

export default global;
