"use client";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import {
  createRating,
  updateRating,
  deleteRating,
} from "@/server.actions/rating.actions"; // Importing deleteRating

// Updated Rating interface
interface Rating {
  serviceId: number;
  id: number; // Add id to the Rating interface
  buyer: {
    id: number;
    profilePic: string | null; // Allow null for profile picture
    firstName: string | null; // Allow null for first name
    lastName: string | null; // Allow null for last name
  };
  rating: number; // Rating should always be a number
  createdAt: string; // Creation date as a string
  review: string | null; // Review can be null
}

interface ServiceReviewsProps {
  ratings: Rating[]; // Accept an array of Rating objects
  serviceId: number; // Accept the service ID
  buyerId: number; // Accept the buyer ID to identify the current user
}

// Update the ServiceReviews component
const ServiceReviews = ({
  ratings,
  serviceId,
  buyerId,
}: ServiceReviewsProps) => {
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [rating, setRating] = useState(0); // State for rating
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [currentRatingId, setCurrentRatingId] = useState<number | null>(null); // ID of the rating being edited

  useEffect(() => {
    // Check for an existing rating from the buyer for this service
    const existingRating = ratings.find(
      (r) => r.buyer.id === buyerId && r.serviceId === serviceId,
    );
    if (existingRating) {
      setReviewText(existingRating.review || "");
      setRating(existingRating.rating);
      setCurrentRatingId(existingRating.id);
      setIsEditing(true);
    } else {
      // Reset if no existing rating is found
      setReviewText("");
      setRating(0);
      setCurrentRatingId(null);
      setIsEditing(false);
    }
  }, [ratings, buyerId, serviceId]);

  const handleSubmitReview = async () => {
    const sellerId = "8592af9f-c51a-4c07-88e4-9d0c5f7d68e4"; // Replace with actual seller ID
    const buyerId = "3"; // Replace with actual buyer ID

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
          buyerId: buyerId.toString(),
          sellerId,
          serviceId,
          rating,
          review: reviewText,
        });
        console.log("Review submitted:", newRating);
        setSuccessMessage("Review submitted successfully!");
      }

      setErrorMessage("");
      setReviewText(""); // Reset the review input after submission
      setRating(0); // Reset the rating
      setIsEditing(false); // Reset editing state
      setCurrentRatingId(null); // Clear current rating ID
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("Failed to submit the review. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleDeleteReview = async () => {
    if (currentRatingId) {
      try {
        await deleteRating(currentRatingId); // Call your delete action
        console.log("Review deleted:", currentRatingId);
        setSuccessMessage("Review deleted successfully!");

        // Reset state after deletion
        setReviewText("");
        setRating(0);
        setIsEditing(false);
        setCurrentRatingId(null);
      } catch (error) {
        console.error("Error deleting review:", error);
        setErrorMessage("Failed to delete the review. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Review Form */}
      <div>
        <input
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)} // Update review text
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
              onClick={() => setRating(i + 1)} // Set rating on star click
            />
          ))}
        </div>

        <button
          onClick={handleSubmitReview} // Handle review submission
          className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-300 mt-4"
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>

        {isEditing && (
          <button
            onClick={handleDeleteReview} // Handle review deletion
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
