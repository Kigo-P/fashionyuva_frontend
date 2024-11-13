import React, { useState, useEffect } from 'react'
import { CreditCard, ShoppingBag, ChevronLeft, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const PaymentStatus = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
}

const Modal = ({ isOpen, onClose, status, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {status === PaymentStatus.SUCCESS
              ? 'Payment Successful'
              : 'Payment Failed'}
          </h2>
          <button onClick={onClose} className="text-black hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
  })
  const [status, setStatus] = useState(PaymentStatus.IDLE)
  const [error, setError] = useState('')
  const [checkoutRequestId, setCheckoutRequestId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let pollInterval

    if (checkoutRequestId) {
      pollInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/payment/status/${checkoutRequestId}`
          )
          const data = await response.json()
          if (data.status === 'completed') {
            setStatus(PaymentStatus.SUCCESS)
            setIsModalOpen(true)
            clearInterval(pollInterval)
          } else if (data.status === 'failed') {
            setStatus(PaymentStatus.ERROR)
            setError(data.resultDesc)
            setIsModalOpen(true)
            clearInterval(pollInterval)
          }
        } catch (err) {
          console.error('Error polling payment status:', err)
        }
      }, 5000)
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [checkoutRequestId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setStatus(PaymentStatus.PROCESSING)
      setError('')

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/initiate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: formData.phoneNumber,
            amount: calculateTotal(),
            order_id: Math.floor(Math.random() * 1000000),
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setCheckoutRequestId(data.CheckoutRequestID)
      } else {
        setStatus(PaymentStatus.ERROR)
        setError(data.error || 'Payment initiation failed')
        setIsModalOpen(true)
      }
    } catch (err) {
      setStatus(PaymentStatus.ERROR)
      setError('Failed to process payment. Please try again.')
      setIsModalOpen(true)
    }
  }

  const cartItems = [
    { id: 1, name: 'iMac 27"', price: 1499, quantity: 2 },
    { id: 2, name: 'Apple Watch Series 8', price: 598, quantity: 1 },
  ]

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:gap-8">
            <div className="md:w-2/3 border border-gray-200 bg-white p-4 shadow-md mt-20 rounded-lg">
              <h1 className="text-4xl font-semibold mb-6">Checkout</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium mb-4">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="KE">Kenya</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">
                    Payment Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number (MPesa STK)
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    disabled={status === PaymentStatus.PROCESSING}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    {status === PaymentStatus.PROCESSING
                      ? 'Processing...'
                      : 'Complete Purchase'}
                  </button>
                </div>
              </form>
            </div>

            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${calculateSubtotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax</p>
                    <p>${calculateTax().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/cart"
              className="text-black hover:text-gray-500 flex items-center"
            >
              <ChevronLeft className="mr-1 h-5 w-5" />
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={status}
        message={
          status === PaymentStatus.SUCCESS
            ? 'Your payment was successful!'
            : error
        }
      />
    </>
  )
}

export default Checkout
