import Footer from '../components/Footer'
import Header from '../components/Header'
import { Star } from 'lucide-react'
import Landing from '../components/Landing'

const Home = () => {
  return (
    <div>
      <Header />
      <section>
        <Landing />
      </section>
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
              <p className="font-semibold">- Satisfied Customer</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 md:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay in Style</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for exclusive offers and fashion
            insights.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md md:w-96 bg-white text-black"
            />
            <button
              type="submit"
              size="lg"
              className="px-4 rounded-md bg-white text-black hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
