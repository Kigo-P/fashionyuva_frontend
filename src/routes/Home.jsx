import Footer from '../components/Footer'
import Header from '../components/Header'
import { Star } from 'lucide-react'
import Landing from '../components/Landing'
import ProductSection from '../components/ProdSpotlight'

const Home = () => {
  const products = [
    {
      name: 'Elegant Watch',
      price: 1299,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Designer Handbag',
      price: 2499,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Luxury Perfume',
      price: 199,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Diamond Necklace',
      price: 5999,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Silk Scarf',
      price: 399,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Leather Wallet',
      price: 599,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Gold Bracelet',
      price: 1799,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      name: 'Crystal Glasses Set',
      price: 899,
      image: '/placeholder.svg?height=400&width=300',
    },
  ]
  return (
    <div>
      <Header />
      <Landing />
      <ProductSection title="New Arrivals" products={products.slice(0, 6)} />
      <ProductSection title="Best Sellers" products={products.slice(2)} />
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            'The quality of their clothes is unmatched. I always feel confident wearing their pieces.',
            'Exceptional customer service and stunning designs. A true luxury experience.',
            "I've been a loyal customer for years. Their attention to detail is remarkable.",
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial}</p>
              <p className="font-semibold">- Mr. Rono</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
