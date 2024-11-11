import React from 'react'
import { Heart, X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCart } from '../store/slices/cartSlice'

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart).cart
  const dispatch = useAppDispatch()

  // Update item quantity in the cart
  const updateQuantity = (id, newQuantity) => {
    dispatch(
      setCart(
        cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
      )
    )
  }

  // Remove item from the cart
  const removeItem = (id) => {
    dispatch(setCart(cartItems.filter((item) => item.id !== id)))
  }

  // Calculate total cost of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0
    )
  }

  return (
    <>
      <Header />
      <section className="bg-white py-8 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Cart Items List */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
                      <div className="flex items-center gap-4">
                        <img
                          className="h-20 w-20 object-contain"
                          src={
                            item.item.images[0] ||
                            `https://picsum.photos/400/300?id=${item.item.id}`
                          }
                          alt={item.item.title}
                        />
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {item.item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            ${item.item.price}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-4 md:mt-0">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="mx-2 w-16 rounded-md border-gray-300 text-center"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full sticky top-6">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">
                  Order summary
                </p>

                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-600">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-600">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${(calculateTotal() * 0.1).toFixed(2)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ${(calculateTotal() * 1.1).toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <Link
                  to="/checkout"
                  className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Link>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500">or</span>
                  <Link
                    to="/listing"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black-600 hover:underline"
                  >
                    Continue Shopping
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Cart
