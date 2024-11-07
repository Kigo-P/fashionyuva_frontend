import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Order placed:', formData)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-900 font-light">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-extralight mb-12 text-center">
            Checkout
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-16"
          >
            <div className="space-y-8">
              <h2 className="text-2xl font-extralight mb-6">
                Shipping Information
              </h2>
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                  required
                />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-extralight mb-6">Payment Details</h2>
              <div className="space-y-6">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full p-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-extralight mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>$19,580</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span>$19,580</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 mt-12 flex justify-end">
              <button
                type="submit"
                className="bg-black text-white px-12 py-4 flex items-center hover:bg-gray-900 transition-colors"
              >
                Complete Purchase
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Checkout
