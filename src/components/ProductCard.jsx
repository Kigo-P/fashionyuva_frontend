import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'

const ProductCard = ({ product, i, tab = 'home' }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={`max-w-sm ${
          tab === 'home' ? 'w-[350px]' : ''
        } rounded-lg overflow-hidden shadow-lg bg-white border border-white`}
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
          <button className="w-full p-2 bg-black rounded-md text-white flex items-center justify-center">
            <ShoppingCart className="mr-2 h-4 w-4" /> <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
