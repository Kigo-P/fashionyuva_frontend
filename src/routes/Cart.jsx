import React, { useState } from 'react'
import { X, Plus, Minus, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Luminous Essence Eau de Parfum', price: 580, quantity: 1 },
    { id: 2, name: 'Silk Opulence Evening Gown', price: 3200, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
    { id: 3, name: 'Celestial Diamond Necklace', price: 15800, quantity: 1 },
  ])

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-900 font-light">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-extralight mb-12 text-center">
            Your Curated Selection
          </h1>
          {cartItems.length === 0 ? (
            <p className="text-xl text-center italic">
              Your cart awaits your exquisite choices
            </p>
          ) : (
            <>
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-6 flex justify-between items-center"
                  >
                    <div className="flex-grow">
                      <h2 className="text-xl mb-2">{item.name}</h2>
                      <p className="text-gray-500">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-gray-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-gray-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-col items-end">
                <div className="text-right mb-8">
                  <p className="text-gray-500 mb-2">Subtotal</p>
                  <p className="text-3xl font-light">
                    ${total.toLocaleString()}
                  </p>
                </div>
                <Link
                  to="/checkout"
                  className="bg-black text-white px-12 py-4 flex items-center hover:bg-gray-900 transition-colors"
                >
                  Proceed to Checkout
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
