import React, { useState } from 'react';
import { X } from 'lucide-react';
import StarRating from './StarRating';

const Review = ({ onClose, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview(rating, review);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Rating</label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              isInteractive={true}
              size={24}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="review" className="font-medium">
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              className="w-full border rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            disabled={rating === 0}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
