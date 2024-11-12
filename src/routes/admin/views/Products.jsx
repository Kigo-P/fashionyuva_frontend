import React, { useState } from 'react'
import { Pencil, Trash2, Star } from 'lucide-react'

export default function ProductListing() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Ergonomic Desk Chair',
      price: 199.99,
      description: 'Comfortable office chair with lumbar support',
      category: 'Furniture',
      image: 'https://picsum.photos/400/300?id=sdfgwerf345sdf',
      rating: 4,
      reviews: 120,
    },
    {
      id: 2,
      name: 'Wireless Noise-Cancelling Headphones',
      price: 299.99,
      description: 'High-quality audio with active noise cancellation',
      category: 'Electronics',
      image: 'https://picsum.photos/400/300?id=sdfgwerf345sdf',
      rating: 5,
      reviews: 85,
    },
    {
      id: 3,
      name: 'Smart Home Security Camera',
      price: 149.99,
      description: 'HD camera with night vision and two-way audio',
      category: 'Smart Home',
      image: 'https://picsum.photos/400/300?id=sdfgwerf345sdf',
      rating: 4,
      reviews: 62,
    },
    {
      id: 4,
      name: 'Portable Power Bank',
      price: 49.99,
      description: '20000mAh capacity with fast charging',
      category: 'Accessories',
      image: 'https://picsum.photos/400/300?id=sdfgwerf345sdf',
      rating: 4,
      reviews: 198,
    },
    {
      id: 5,
      name: 'Stainless Steel Water Bottle',
      price: 24.99,
      description: 'Insulated bottle keeps drinks hot or cold for hours',
      category: 'Lifestyle',
      image: 'https://picsum.photos/400/300?id=sdfgwerf345sdf',
      rating: 5,
      reviews: 231,
    },
    {
      id: 6,
      name: 'Yoga Mat',
      price: 39.99,
      description: 'Non-slip, eco-friendly exercise mat',
      category: 'Fitness',
      image: 'https://picsum.photos/400/300?id=sdfgwerf345sdf',
      rating: 4,
      reviews: 75,
    },
  ])

  const handleEdit = (productId) => {
    console.log(`Edit product with id: ${productId}`)
  }

  const handleDelete = (productId) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200"
          >
            <img
              className="w-full h-48 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="px-6 py-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-xl mb-2">{product.name}</h2>
              </div>
              <div className="mb-2">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-700 text-base mb-4">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-black">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating
                          ? 'text-black fill-black'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="flex-1 mr-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-black text-white hover:bg-gray-800 focus:ring-gray-500"
                  aria-label={`Edit ${product.name}`}
                >
                  <Pencil className="w-4 h-4 mr-2 inline-block" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 ml-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black border border-black hover:bg-gray-100 focus:ring-gray-500"
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 className="w-4 h-4 mr-2 inline-block" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
