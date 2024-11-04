"use client";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import {
  createRating,
  updateRating,
  deleteRating,
} from "@/server.actions/rating.actions";

// Updated Rating interface to match your database schema
interface Rating {
  id: string;
  serviceId: string;
  rater: {
    id: string;
    profilePic: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  ratee: {
    id: string;
  };
  rating: number;
  review: string | null;
  createdAt: Date;
}

interface ServiceReviewsProps {
  ratings: Rating[];
  serviceId: string;
  raterId: string;
  rateeId: string;
}

const ServiceReviews = ({
  ratings,
  serviceId,
  raterId,
  rateeId,
}: ServiceReviewsProps) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentRatingId, setCurrentRatingId] = useState<string | null>(null);

  useEffect(() => {
    // Check for an existing rating from the rater for this service
    const existingRating = ratings.find(
      (r) => r.rater.id === raterId && r.serviceId === serviceId,
    );
    if (existingRating) {
      setReviewText(existingRating.review || "");
      setRating(existingRating.rating);
      setCurrentRatingId(existingRating.id);
      setIsEditing(true);
    } else {
      setReviewText("");
      setRating(0);
      setCurrentRatingId(null);
      setIsEditing(false);
    }
  }, [ratings, raterId, serviceId]);

  const handleSubmitReview = async () => {
    try {
      if (isEditing && currentRatingId) {
        // Update existing rating
        const updatedRating = await updateRating(currentRatingId, {
          rating,
          review: reviewText,
        });
        console.log("Review updated:", updatedRating);
        setSuccessMessage("Review updated successfully!");
      } else {
        // Create a new rating
        const newRating = await createRating({
          raterId,
          rateeId,
          serviceId,
          rating,
          review: reviewText,
        });
        console.log("Review submitted:", newRating);
        setSuccessMessage("Review submitted successfully!");
      }

      setErrorMessage("");
      // Don't reset form immediately to show success message
      setTimeout(() => {
        setReviewText("");
        setRating(0);
        setIsEditing(false);
        setCurrentRatingId(null);
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("Failed to submit the review. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleDeleteReview = async () => {
    if (currentRatingId) {
      try {
        await deleteRating(currentRatingId);
        console.log("Review deleted:", currentRatingId);
        setSuccessMessage("Review deleted successfully!");

        setTimeout(() => {
          setReviewText("");
          setRating(0);
          setIsEditing(false);
          setCurrentRatingId(null);
          setSuccessMessage("");
        }, 2000);
      } catch (error) {
        console.error("Error deleting review:", error);
        setErrorMessage("Failed to delete the review. Please try again.");
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write a review"
          className="w-full bg-muted p-2 rounded-lg mt-4"
        />
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 cursor-pointer ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>

        <button
          onClick={handleSubmitReview}
          className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-300 mt-4"
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>

        {isEditing && (
          <button
            onClick={handleDeleteReview}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300 mt-2"
          >
            Delete Review
          </button>
        )}

        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ServiceReviews;
