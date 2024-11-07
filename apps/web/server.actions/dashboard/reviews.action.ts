"use server";
import prisma from "@/lib/prismaClient";

export type ReviewsType = {
  id: number;
  service: string | null;
  reviewer: string | null;
  rating: number | null;
  comment: string | null;
};

export const getReviews = async () => {
  try {
    const reviews = await prisma.rating.findMany({
      select: {
        id: true,
        service: true,
        rating: true,
        rater: true,
        ratee: true,
        review: true,
        createdAt: true,
      },
    });

    const formattedReviews = reviews.map((rating) => ({
      id: Number(rating.id),
      service: rating.service?.name,
      reviewer: rating.rater.firstName,
      revewee: rating.rater.firstName,
      rating: rating.rating,
      comment: rating.review ? rating.review : "No review",
    }));

    return formattedReviews;
  } catch (error) {
    console.error("Error fetching reviews data:", error);
    return [];
  }
};

export type FormattedReviewsType = Awaited<ReturnType<typeof getReviews>>;
