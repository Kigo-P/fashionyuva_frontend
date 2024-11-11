import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

const SkeletonLoader = () => (
  <div className="w-full aspect-[3/4] bg-gray-200 rounded-md animate-pulse"></div>
)

const ProductSection = ({ title, products, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProduct = () => {
    if (products && products.length > 4) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (products.length - 3))
    }
  }

  const prevProduct = () => {
    if (products && products.length > 4) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + products.length - 3) % (products.length - 3)
      )
    }
  }

  const renderContent = () => {
    if (isLoading || !products) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )
    }

    return (
      <div className="relative">
        <div className="flex items-center justify-between gap-8 overflow-hidden">
          {products.slice(currentIndex, currentIndex + 4).map((product, i) => (
            <ProductCard key={i} product={product} i={i} tab="home" />
          ))}
        </div>
        {products.length > 4 && (
          <>
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-12 text-center">
          {title}
        </h2>
        {renderContent()}
      </div>
    </section>
  )
}

export default ProductSection
