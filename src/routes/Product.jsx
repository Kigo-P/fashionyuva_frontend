import React, { useEffect, useState } from 'react'
import { Heart, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import StarRating from './StarRating'
import Review from './Review'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCart } from '../store/slices/cartSlice'

function Product() {
  const cart = useAppSelector((state) => state.cart).cart
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState(null)
  const [showReviews, setShowReviews] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  let { id } = useParams()

  useEffect(() => {
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
    getProduct()
  }, [id])

  const averageRating =
    reviews.reduce((acc, review) => acc + parseInt(review.rating), 0) /
    (reviews.length || 1)

  const handleSubmitReview = async (rating, text) => {
    const newReview = {
      id: reviews.length + 1,
      rating,
      comment: text,
      date: new Date().toISOString().split('T')[0],
      user_id: 1,
      product_id: id,
    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews`, {
      method: 'POST',
      body: JSON.stringify(newReview),
    })
    console.log(reviews)
    setReviews([newReview, ...reviews])
  }

  if (!product) return <p>Loading...</p>

  const images = product.images.length ? product.images : ['/placeholder.jpg']

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={
              images[currentImageIndex].url ||
              `https://picsum.photos/400/300?id=dfgsdrgdrgdfg`
            }
            alt={product.title}
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

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              ${product.price}
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
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                const itemExists = cart.some((item) => item.id === product.id)
                if (itemExists) {
                  dispatch(
                    setCart(cart.filter((item) => item.id !== product.id))
                  )
                } else {
                  dispatch(
                    setCart([
                      ...cart,
                      { id: product.id, quantity: 1, item: product },
                    ])
                  )
                }
              }}
              className={`w-full p-2 rounded-md text-white flex items-center justify-center ${
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
            <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Product Details
            </h3>
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
        <Review
          onClose={() => setShowReviewModal(false)}
          onSubmitReview={handleSubmitReview}
        />
      )}
      <Footer />
    </div>
  )
}

export default Product
