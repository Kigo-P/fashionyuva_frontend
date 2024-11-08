import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import StarRating from './StarRating';
import Review from './Review';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DenimJeansImage from "../assets/DenimJeans1.jpg";
import Denim from "../assets/img/DenimJeans2.jpg"

function Product() {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 4,
      text: "Great fit and very comfortable!",
      date: "2024-03-10"
    },
    {
      id: 2,
      rating: 5,
      text: "Perfect denim quality, highly recommend!",
      date: "2024-03-09"
    }
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleSubmitReview = (rating, text) => {
    const newReview = {
      id: reviews.length + 1,
      rating,
      text,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
  };
  const images = [DenimJeansImage, Denim];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
        <Header/>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
         <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt="Denim jeans"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Denim jeans</h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">Ksh1,299.00</p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={averageRating} />
              <span className="text-sm text-gray-500">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium text-gray-900">Color</h3>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-medium text-gray-900">Size</h3>
            <select className="mt-2 w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select size</option>
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
              <option value="xl">X-Large</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium text-gray-900">Quantity</h3>
            <input
                type="number"
                className="mt-2 w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter quantity"
                min="1" // Optional: Set a minimum value
                step="1" // Optional: Set step size to whole numbers
            />
            </div>

          {/* Add to Cart */}
          <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Add to Cart
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
            <p className="text-gray-600">
              Crafted from premium materials, this luxury item features exceptional
              craftsmanship and attention to detail. The perfect blend of style and
              functionality.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Material: Premium Italian Leather</li>
              <li>Dimensions: 12" x 8" x 4"</li>
              <li>Made in Italy</li>
            </ul>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-6">
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="w-full py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {showReviews ? 'Hide' : 'Show'} Reviews & Ratings
            </button>

            {showReviews && (
              <div className="mt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <StarRating rating={review.rating} />
                      <p className="mt-2 text-gray-600">{review.text}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Posted on {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showReviewModal && (
        <Review
          onClose={() => setShowReviewModal(false)}
          onSubmitReview={handleSubmitReview}
        />
      )}
      <Footer/>
    </div>
  );
}

export default Product;
