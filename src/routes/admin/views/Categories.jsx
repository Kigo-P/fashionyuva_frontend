import React, { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../store/hooks/'

const SkeletonLoader = () => (
  <div className="border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
    <div className="h-6 bg-gray-200 mb-2 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 mb-4 rounded w-5/6"></div>
    <div className="flex justify-end space-x-2">
      <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
      <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
    </div>
  </div>
)

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    description: '',
  })
  const [editingCategory, setEditingCategory] = useState(null)
  const identity = useAppSelector((state) => state.identity)

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/categories`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity?.access_token}`,
          },
        }
      )
      const data = await res.json()
      if (res.ok) {
        setCategories(data)
      } else {
        throw new Error(data.message)
      }
    } catch (e) {
      toast(e.message, { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (newCategory.name && newCategory.description) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/categories`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${identity?.access_token}`,
            },
            body: JSON.stringify(newCategory),
          }
        )
        if (!response.ok) throw new Error('Failed to post category')
        fetchCategories()
        setNewCategory({ id: '', name: '', description: '' })
        setEditingCategory(null)
        setIsModalOpen(false)
      } catch (error) {
        toast(error.message, { type: 'error' })
      }
      setNewCategory({ id: '', name: '', description: '' })
      setIsModalOpen(false)
    }
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setNewCategory(category)
    setIsModalOpen(true)
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${newCategory.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity?.access_token}`,
          },
          body: JSON.stringify(newCategory),
        }
      )
      if (!response.ok) throw new Error('Failed to patch category')
      fetchCategories()
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? newCategory : cat
        )
      )
      setNewCategory({ id: '', name: '', description: '' })
      setEditingCategory(null)
      setIsModalOpen(false)
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  const handleDeleteCategory = async (id) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity?.access_token}`,
          },
        }
      )
      if (!response.ok) throw new Error('Failed to delete category')
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button
          onClick={() => {
            setNewCategory({ id: '', name: '', description: '' })
            setEditingCategory(null)
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, index) => <SkeletonLoader key={index} />)
          : categories.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label={`Edit ${category.name}`}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label={`Delete ${category.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form
              onSubmit={
                editingCategory ? handleUpdateCategory : handleAddCategory
              }
            >
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
