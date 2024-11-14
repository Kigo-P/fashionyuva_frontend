import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Star, X } from 'lucide-react'

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
      const data = await res.json()
      if (res.ok) {
        setProducts(data)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleEdit = async (product) => {
    setEditProduct(product)
    setIsEditing(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
          {
            method: 'DELETE',
          }
        )

        if (res.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== productId)
          )
        } else {
          const data = await res.json()
          console.log(data.message)
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const closeModal = () => {
    setIsEditing(false)
    setEditProduct(null)
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${editProduct.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editProduct),
        }
      )

      if (res.ok) {
        const updatedProduct = await res.json()
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        )
      } else {
        const data = await res.json()
        console.log(data.message)
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }

    closeModal()
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-200 border border-gray-300 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300" />
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded mt-4"></div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name}
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-xl mb-2">{product.title}</h2>
                  </div>
                  <div className="mb-2">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {product.categories.name}
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
                        ({product.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between flex-nowrap">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex flex-nowrap items-center justify-center flex-1 mr-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-black text-white hover:bg-gray-800 focus:ring-gray-500"
                      aria-label={`Edit ${product.title}`}
                    >
                      <Pencil className="w-4 h-4 mr-2 inline-block" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex flex-nowrap items-center justify-center flex-1 ml-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black border border-black hover:bg-gray-100 focus:ring-gray-500"
                      aria-label={`Delete ${product.title}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2 inline-block" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button onClick={closeModal}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>
            <form onSubmit={handleSubmitEdit}>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  className="block w-full mt-1 p-2 border rounded"
                  value={editProduct?.title || ''}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, title: e.target.value })
                  }
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  className="block w-full mt-1 p-2 border rounded"
                  value={editProduct?.description || ''}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label className="block mb-4">
                Price:
                <input
                  type="number"
                  className="block w-full mt-1 p-2 border rounded"
                  value={editProduct?.price || 0}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md font-medium text-white bg-black hover:bg-gray-800"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
