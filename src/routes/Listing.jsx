import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-md h-64"></div>
)

const Listing = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 2000],
    search: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const productsPerPage = 12

  const fetchProducts = async () => {
    setIsLoading(true)
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
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      (filters.category === '' || product.category === filters.category) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1] &&
      (filters.search === '' ||
        product.title.toLowerCase().includes(filters.search.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({ category: '', priceRange: [0, 2000], search: '' })
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (value) => {
    handleFilterChange('priceRange', [0, parseInt(value, 10)])
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Collection</h1>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mb-4 flex items-center"
        >
          {showFilters ? (
            <X className="mr-2 h-4 w-4" />
          ) : (
            <Filter className="mr-2 h-4 w-4" />
          )}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <aside
            className={`w-full md:w-1/4 space-y-6 ${
              showFilters ? 'block' : 'hidden md:block'
            }`}
          >
            <div>
              <h2 className="font-semibold mb-2">Search</h2>
              <input
                type="text"
                className="px-2 py-3 border border-gray-300 rounded-md w-full"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div>
              <h2 className="font-semibold mb-2">Category</h2>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">All Categories</option>
                <option value="Dresses">Dresses</option>
                <option value="Suits">Suits</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Price Range</h2>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span>$0</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full mt-4 bg-black hover:bg-gray-800 transition-colors text-white rounded-md p-2"
            >
              Clear Filters
            </button>
          </aside>

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: productsPerPage }).map((_, index) => (
                    <SkeletonLoader key={index} />
                  ))
                : currentProducts.map((product, i) => (
                    <ProductCard
                      key={i}
                      product={product}
                      i={i}
                      tab="listing"
                    />
                  ))}
            </div>

            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`p-2 rounded-md ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Listing
