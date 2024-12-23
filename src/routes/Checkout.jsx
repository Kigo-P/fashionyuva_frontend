import React, { useState, useEffect, useCallback } from 'react'
import { CreditCard, ChevronLeft, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setIdentity } from '../store/slices/identitySlice'
import { api } from '../utils/api'
import { setCart } from '../store/slices/cartSlice'

const PaymentStatus = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
}

const Modal = ({ isOpen, onClose, status, message, orderid }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleModalClose = () => {
    if (status === PaymentStatus.SUCCESS) {
      onClose()
      if (orderid) {
        setTimeout(() => navigate(`/receipt/${orderid}`), 2000)
      }
    } else {
      onClose()
    }
  }

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
          onClick={handleModalClose}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const Checkout = () => {
  const identity = useAppSelector((state) => state.identity)
  const cartItems = useAppSelector((state) => state.cart).cart

  const dispatch = useAppDispatch()

  const [addressId, setAddressId] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    county: '',
  })
  const [status, setStatus] = useState(PaymentStatus.IDLE)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState('')
  const [checkoutRequestId, setCheckoutRequestId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const shipping = 0

  const calculateSubtotal = useCallback(
    () =>
      cartItems.reduce(
        (total, item) => total + item.item.price * item.quantity,
        0
      ),
    [cartItems]
  )

  const calculateTax = useCallback(
    () => calculateSubtotal() * 0.1,
    [calculateSubtotal]
  )

  const calculateTotal = useCallback(
    () => calculateSubtotal() + calculateTax() + shipping,
    [calculateSubtotal, calculateTax]
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  useEffect(() => {
    if (!identity) return

    const userAddresses = identity.user?.addresses || []
    const selectedAddress = userAddresses[addressId] || {}

    setFormData((prevState) => ({
      ...prevState,
      email: identity.user.email || '',
      firstName: identity.user.username.split(' ')[0] || '',
      lastName: identity.user.username.split(' ')[1] || '',
      address: selectedAddress.address || '',
      city: selectedAddress.town || '',
      postalCode: selectedAddress.zip_code || '',
      country: selectedAddress.country || '',
      county: selectedAddress.county || '',
    }))
  }, [identity, addressId])

  useEffect(() => {
    if (!checkoutRequestId) return

    const pollPaymentStatus = async () => {
      try {
        const response = await api(`/api/payment/status/${checkoutRequestId}`)
        const data = await response.json()

        if (data.status === 'completed') {
          clearInterval(pollInterval)
          handlePaymentSuccess(data)
        } else if (data.status === 'failed') {
          clearInterval(pollInterval)
          handlePaymentError(data.resultDesc)
        }
      } catch (err) {
        console.error('Error polling payment status:', err)
      }
    }

    const pollInterval = setInterval(pollPaymentStatus, 5000)
    return () => clearInterval(pollInterval)
  }, [checkoutRequestId])

  const handlePaymentSuccess = async () => {
    setStatus(PaymentStatus.SUCCESS)
    setIsModalOpen(true)
    const total = calculateTotal()

    try {
      const orderResponse = await api('/orders', 'POST', {
        total_price: total,
        status: 'pending',
        user_id: identity.user.user_id,
      })
      const orderData = await orderResponse.json()

      setOrderId(orderData.id)

      await api('/order-products', 'POST', {
        cart: cartItems.map((prod) => ({
          id: prod.id,
          quantity: prod.quantity,
          order_id: orderData.id,
        })),
      })

      dispatch(
        setIdentity({
          ...identity,
          address: {
            address: formData.address,
            city: formData.city,
            pincode: formData.postalCode,
          },
        })
      )
      dispatch(setCart([]))
    } catch (err) {
      console.error('Error saving order:', err)
    }
  }

  const handlePaymentError = (errorMessage) => {
    setStatus(PaymentStatus.ERROR)
    setError(errorMessage)
    setIsModalOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setStatus(PaymentStatus.PROCESSING)
      const response = await api(`/api/payment/initiate`, 'POST', {
        phone_number: formData.phoneNumber,
        amount: calculateTotal(),
        order_id: Math.floor(Math.random() * 1000000),
      })

      const data = await response.json()
      if (response.ok) {
        setCheckoutRequestId(data.CheckoutRequestID)
        if (formData.address !== identity?.address?.address) {
          await api(`/addresses`, 'POST', {
            user_id: identity.user.user_id,
            address: formData.address,
            county: formData.county,
            town: formData.city,
            zip_code: formData.postalCode,
            country: formData.country,
          })
        }
      } else {
        handlePaymentError(data.error || 'Payment initiation failed')
      }
    } catch (err) {
      handlePaymentError('Failed to process payment. Please try again.')
    }
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
                  {Array.isArray(identity.user?.addresses) &&
                  identity.user?.addresses.length > 0 ? (
                    <div className="mt-4 mb-2">
                      <select
                        name="addresses"
                        id="addresses"
                        className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={addressId}
                        onChange={(e) => setAddressId(e.target.value)}
                      >
                        <option value="">Select an Adress</option>
                        {identity.user?.addresses.map((address, index) => (
                          <option
                            key={index}
                            value={index}
                            className="py-2 px-3 text-gray-700"
                          >
                            {`${address.country} - ${address.county} - ${address.town} - ${address.zip_code}`}{' '}
                            ({address.address})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

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
                        htmlFor="County"
                        className="block text-sm font-medium text-gray-700"
                      >
                        County
                      </label>
                      <input
                        type="text"
                        id="county"
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        className="p-2 mt-1 outline-none block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
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
                        <option value="tanzania">Tanzania</option>
                        <option value="kenya">Kenya</option>
                        <option value="uganda">Uganda</option>
                        <option value="ethiopia">Ethiopia</option>
                      </select>
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
                <h2 className="text-xl font-semibold mb-4">Order Invoice</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.item.title}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(
                          (item.item.price * item.quantity).toFixed(2)
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{formatCurrency(calculateSubtotal().toFixed(2))}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax</p>
                    <p>{formatCurrency(calculateTax().toFixed(2))}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>{formatCurrency(calculateTotal().toFixed(2))}</p>
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
        orderid={orderId}
      />
    </>
  )
}

export default Checkout
