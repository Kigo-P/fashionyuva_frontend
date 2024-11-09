import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, isInteractive = false, size = 20 }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => isInteractive && onRatingChange?.(star)}
          className={`${isInteractive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} 
                    transition-transform duration-200`}
          disabled={!isInteractive}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-none text-gray-300'
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
