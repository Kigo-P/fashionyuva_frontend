import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Facebook, Instagram, MapPin, Phone, Twitter, Mail } from 'lucide-react'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    message: '',
    about_us: '',
  })
  const [isloading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      setIsLoading(false)
      if (res.ok) {
        toast('contact saved successfully!', { type: 'success' })
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          contact: '',
          message: '',
          about_us: '',
        })
      } else {
        throw new Error(data.message)
      }
    } catch (e) {
      setIsLoading(false)
      toast(e.message, { type: 'error' })
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center p-4 mt-10">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 bg-black text-white">
            <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
            <p className="mb-6 text-gray-300">
              We'd love to hear from you. Drop us a line about anything fashion.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <span className="font-semibold mr-2">
                  <MapPin />
                </span>{' '}
                4th Street Ngong Avenue
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">
                  <Phone />
                </span>{' '}
                +254715503942
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">
                  <Mail />
                </span>{' '}
                hello@fashionyuva.com
              </p>
            </div>
            <div className="mt-8 flex space-x-4">
              <Instagram />
              <Facebook />
              <Twitter />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium mb-1"
                >
                  contact (optional)
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  rows={4}
                  required
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">
                  How did you hear about us?
                </h2>
                <select
                  name="about_us"
                  value={formData.about_us}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                >
                  <option value="default_empty">select an option</option>
                  <option value="social">Social Media</option>
                  <option value="refferal">Refferal</option>
                  <option value="events">events</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              {isloading ? 'sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
