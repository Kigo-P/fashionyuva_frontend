import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Star, X, Upload } from 'lucide-react'
import { api } from '../../../utils/api'
import ImageUpload from '../../../utils/ImageUpload'

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [edLoading, setEdLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setImages((prevImages) => [...prevImages, ...newFiles])
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api('/products')
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
    setImages(product.images.map((i) => i.url))
    setIsEditing(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await api(`/products/${productId}`, 'DELETE')
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
      setEdLoading(true)
      console.log(editProduct)
      const res = await api(`/products/${editProduct.id}`, 'PATCH', {
        title: editProduct.title,
        description: editProduct.description,
        price: editProduct.price,
        images: images,
      })
      if (res.ok) {
        fetchProducts()
      } else {
        const data = await res.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error)
      console.error('Error updating product:', error)
    } finally {
      setEdLoading(false)
    }
    closeModal()
  }

  const calculateRating = (reviews) => {
    return Math.floor(
      reviews
        .map((review) => Math.floor(parseFloat(review.rating)))
        .reduce((a, b) => a + b, 0) / reviews.length
    )
  }

  const format = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  // image upload on image Place
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setImages([...images, ...Array.from(event.dataTransfer.files || [])])
  }

  useEffect(() => {
    const uploadfile = async () => {
      const imgs = []
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          if (typeof images[i] === 'string') {
            imgs.push(images[i])
          } else {
            imgs.push(await ImageUpload(images[i]))
          }
        }
      }
      setImages(imgs)
    }

    uploadfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

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
          : products.map((product, i) => (
              <div
                key={product.id}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={
                    product.images[0]?.url ||
                    `https://picsum.photos/400/300?id=${i + 1}`
                  }
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
                  <div className="flex justify-between flex-wrap gap-2 items-center mb-4">
                    <span className="text-2xl font-bold text-black">
                      {format(product.price)}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i + 1 <= calculateRating(product.reviews)
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

              <div className="space-y-3 md:col-span-2 mb-2">
                <label
                  htmlFor="category"
                  className="block font-medium text-gray-900"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={editProduct?.price || 0}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      category_id: parseInt(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="1">Men</option>
                  <option value="2">Women</option>
                  <option value="3">Children</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 w-full">
                  Product Images
                </label>
                <div className="flex flex-wrap gap-4 w-full">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      {typeof image === 'string' ? (
                        <>
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
                          <p className="text-gray-500">Uploading...</p>
                        </div>
                      )}
                    </div>
                  ))}

                  <label
                    className="w-full h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">
                      Add Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md font-medium text-white bg-black hover:bg-gray-800"
              >
                {edLoading ? 'Updating...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
