import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCart } from '../store/slices/cartSlice'
import { api } from '../utils/api'
import { X } from 'lucide-react'
import StarRating from './StarRating'

function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
        <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gray-300 animate-pulse" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <div className="w-5 h-5 bg-gray-300 animate-pulse rounded-full" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <div className="w-5 h-5 bg-gray-300 animate-pulse rounded-full" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded" />
            <div className="h-6 w-1/4 mt-2 bg-gray-300 animate-pulse rounded" />
            <div className="flex items-center gap-2 mt-2">
              <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
              <div className="h-4 w-16 bg-gray-300 animate-pulse rounded" />
            </div>
          </div>

          <div>
            <div className="h-5 w-16 mb-2 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
          </div>

          <div>
            <div className="h-5 w-16 mb-2 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
          </div>

          <div>
            <div className="h-5 w-24 mb-2 bg-gray-300 animate-pulse rounded" />
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded" />
          </div>

          <div className="h-12 w-full bg-gray-300 animate-pulse rounded" />

          <div className="border-t pt-6">
            <div className="h-6 w-36 mb-2 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-full mt-2 bg-gray-300 animate-pulse rounded" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
              <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded" />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded" />
            <div className="mt-6 space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-6 w-40 bg-gray-300 animate-pulse rounded" />
                <div className="h-6 w-32 bg-gray-300 animate-pulse rounded" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="h-4 w-24 mb-2 bg-gray-300 animate-pulse rounded" />
                    <div className="h-4 w-full bg-gray-300 animate-pulse rounded" />
                    <div className="h-4 w-full mt-1 bg-gray-300 animate-pulse rounded" />
                    <div className="h-3 w-32 mt-1 bg-gray-300 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function Product() {
  const cart = useAppSelector((state) => state.cart).cart
  const identity = useAppDispatch((state) => state.identity)
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState(null)
  const [showReviews, setShowReviews] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  let { id } = useParams()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const getProduct = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
      )
      const data = await res.json()
      if (res.ok) {
        setProduct(data)
        setReviews(data.reviews)
      } else {
        toast('Error Getting Product', { type: 'error' })
      }
    } catch (error) {
      toast('Network Error', { type: 'error' })
    }
  }
  useEffect(() => {
    getProduct()
  }, [id])

  const averageRating =
    reviews.reduce((acc, review) => acc + parseInt(review.rating), 0) /
    (reviews.length || 1)

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    const newReview = {
      id: reviews.length + 1,
      rating,
      comment: review,
      date: new Date().toISOString().split('T')[0],
      user_id: identity?.user?.user_id || 1,
      product_id: id,
    }
    const res = await api(`/reviews`, 'POST', newReview)
    if (res.ok) {
      setShowReviewModal(false)
      getProduct()
    } else {
      toast('failed to post review!', { type: 'error' })
    }
  }

  if (!product) return <ProductSkeleton />

  const images = product.images.length ? product.images : ['/girl.jpg']

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const format = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  return (
  <div className="min-h-screen bg-gray-50">
<Header />
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 sm:mt-20 lg:mt-24">
  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
    <img
      src={
        images[currentImageIndex].url ||
        `https://picsum.photos/400/300?id=dfgsdrgdrgdfg`
      }
      alt={product.title}
      className="w-full h-full object-cover"
    />
    {images.length >= 2 && (
      <>
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
      </>
    )}
  </div>

  <div className="space-y-6">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        {product.title}
      </h1>
      <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-2">
        {format(product.price)}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <StarRating rating={averageRating} />
        <span className="text-sm text-gray-500">
          ({reviews.length} reviews)
        </span>
      </div>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">Color</h3>
      <p className="text-gray-700">{product.color}</p>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">Size</h3>
      <p className="text-gray-700">{product.size}</p>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">Quantity</h3>
      <input
        type="number"
        className="mt-2 w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter quantity"
        min="1"
        step="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          const itemExists = cart.some((item) => item.id === product.id);
          if (itemExists) {
            dispatch(
              setCart(cart.filter((item) => item.id !== product.id))
            );
          } else {
            dispatch(
              setCart([
                ...cart,
                {
                  id: product.id,
                  quantity: quantity < 0 ? 1 : quantity,
                  item: product,
                },
              ])
            );
          }
        }}
        className={`w-full sm:w-auto p-2 rounded-md text-white flex items-center justify-center ${
          cart.some((item) => item.id === product.id)
            ? 'bg-red-500'
            : 'bg-black'
        }`}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        <span>
          {cart.some((item) => item.id === product.id)
            ? 'Remove from Cart'
            : 'Add to Cart'}
        </span>
      </button>
    </div>

    <div className="border-t pt-6">
      <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
      <p className="text-gray-600">{product.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li>Material: {product.material}</li>
        <li>Quantity available: {product.quantity}</li>
      </ul>
    </div>

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
            <h3 className="font-semibold text-gray-900">
              Customer Reviews
            </h3>
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
                <StarRating rating={parseInt(review.rating)} />
                <p className="mt-2 text-gray-600">{review.comment}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Posted on {review.created_at}
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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
      <button
        onClick={() => setShowReviewModal(false)}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>

      <form onSubmit={handleSubmitReview} className="space-y-4">
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
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-black focus:border-gray-700"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-500 transition-colors duration-200"
          disabled={rating === 0}
        >
          Submit Review
        </button>
      </form>
    </div>
  </div>
)}
<Footer />
  </div>
  )
}

export default Product
