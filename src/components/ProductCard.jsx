import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCart } from '../store/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductCard = ({ product, i, tab = 'home' }) => {
  const cart = useAppSelector((state) => state.cart).cart
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return (
    <div
      className={`max-w-sm ${
        tab === 'home' ? 'w-[350px]' : ''
      } rounded-lg overflow-hidden shadow-lg bg-white border border-white`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        className="w-full h-48 object-cover"
        src={`https://picsum.photos/400/300?id=${i + 1}`}
        // src={product.images.url}
        alt="Product Image"
      />
      <div className="px-6 py-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-xl mb-2">{product.title}</h2>
        </div>
        <div className="">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {product.categories.name}
          </span>
        </div>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>
        <div className="flex justify-between gap-4 items-center mb-4">
          <span className="text-2xl font-bold text-primary whitespace-nowrap">
            Ksh {product.price.toLocaleString()}
          </span>
          <div className="flex items-center">
            {product.reviews.length !== 0
              ? [...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))
              : null}
            <span className="text-sm text-gray-600 ml-2 whitespace-nowrap">
              ({product.reviews.length} reviews)
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            const itemExists = cart.some((item) => item.id === product.id)
            if (itemExists) {
              dispatch(setCart(cart.filter((item) => item.id !== product.id)))
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
      </div>
    </div>
  )
}

export default ProductCard
