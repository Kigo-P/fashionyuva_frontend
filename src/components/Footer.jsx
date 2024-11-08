import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <>
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
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:underline">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:underline">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Fasionayuva shop. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
