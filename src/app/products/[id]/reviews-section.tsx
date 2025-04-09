import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/lib/db";

interface Review {
  content: string;
  createdAt: string;
}

export default function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews: Review[] = await getReviews(productId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleAddReview = async () => {
    if (!newReview.trim()) return;

    try {
      const newReviewObject: Review = { content: newReview, createdAt: new Date().toISOString() };
      await addReview(productId, newReview);
      setReviews((prev) => [...prev, newReviewObject]);
      setNewReview("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-md">
            {review.content}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleAddReview}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}