import { useState, useEffect } from 'react';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export default function Product() {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState({ average: 4.5, count: 24 });
  const [comments, setComments] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // For the review drawer
  const [images, setImages] = useState([]); // For fetched images

  const colors = [
    { name: 'Black', value: 'black' },
    { name: 'White', value: 'white' },
    { name: 'Maroon', value: 'maroon' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Fetch images and product details from the backend (API endpoint example)
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const res = await fetch('/api/products/1/images'); // Replace with your product's image API endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await res.json();
        setImages(data.images); // Assume the response is { images: [imageURLs] }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductImages();
  }, []);

  const handleRatingSubmit = () => {
    if (userRating > 0) {
      setRatings(prev => ({
        average: (prev.average * prev.count + userRating) / (prev.count + 1),
        count: prev.count + 1,
      }));
      setUserRating(0);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments(prev => [...prev, { text: comment, date: new Date().toISOString() }]);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {images.length > 0 ? (
                <img
                  src={images[currentImage]}
                  alt="Product image"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-200">Loading Image...</div>
              )}
              <button
                onClick={() => setCurrentImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`aspect-square rounded-md overflow-hidden ${
                    currentImage === idx ? 'ring-2 ring-maroon' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Luxury Leather Crossbody Bag</h1>
              <p className="text-2xl font-bold text-maroon mt-2">$1,299.00</p>
            </div>

            <div className="flex items-center gap-4">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= (ratings?.average || 4.5) ? 'fill-maroon text-maroon' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">({ratings?.count || 24} reviews)</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">Color</label>
                <div className="flex gap-3 mt-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color.value ? 'border-maroon' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Size</label>
                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Quantity</label>
                <select
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-32 mt-2 border border-gray-300 rounded px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded">
                Add to Cart
              </button>
              <button className="bg-white border border-gray-300 px-4 py-2 rounded">
                <Heart className="w-5 h-5" />
              </button>
              <button className="bg-white border border-gray-300 px-4 py-2 rounded">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-medium text-lg mb-2">Product Details</h3>
              <p className="text-gray-600">
                Crafted from premium materials, this luxury item features exceptional craftsmanship
                and attention to detail. The perfect blend of style and functionality.
              </p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Material: Premium Italian Leather</p>
                <p>Dimensions: 12" x 8" x 4"</p>
                <p>Made in Italy</p>
              </div>
            </div>

            {/* Reviews Section */}
            <button
              onClick={() => setIsSheetOpen(true)}
              className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Show Reviews & Ratings
            </button>
            {isSheetOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
                <div className="w-96 bg-white p-6">
                  <button onClick={() => setIsSheetOpen(false)} className="mb-4">Close</button>
                  <h3 className="font-medium text-lg mb-2">Reviews & Ratings</h3>
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <div key={index} className="border-b pb-2">
                        <p className="text-gray-800">{comment.text}</p>
                        <p className="text-gray-500 text-sm">{new Date(comment.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium">Leave a Review</h4>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className={star <= userRating ? 'text-maroon' : 'text-gray-400'}
                        >
                          <Star />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      className="w-full mt-2 border border-gray-300 rounded p-2"
                      rows={4}
                      placeholder="Write your review here..."
                    ></textarea>
                    <button
                      onClick={() => {
                        handleRatingSubmit();
                        handleCommentSubmit();
                      }}
                      className="w-full bg-maroon text-white mt-2 p-2 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
