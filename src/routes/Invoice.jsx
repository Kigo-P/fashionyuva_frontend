import React from 'react'
import { Store } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const Invoice = () => {
  const cart = useAppSelector((state) => state.cart).cart

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.quantity * item.item.price
  }, 0)
  const shipping = 300
  const taxRate = 0.18
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax
  const invoiceData = {
    orderNumber: 'INV-2024-001',
    orderDate: new Date().toLocaleDateString(),
    customerDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Fashion Street',
      city: 'Nairobi',
      pincode: '00100',
    },
    items: cart,
    subtotal: subtotal,
    shipping: shipping,
    tax: tax,
    total: total,
  }
  const format = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 relative mt-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: 'url(/src/assets/ground.jpg)' }}
        ></div>
        <Link
          to="/checkout"
          className="fixed top-20 right-2 flex w-min whitespace-nowrap items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Back to Checkout
        </Link>

        <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center">
              <Store className="text-gray-800 text-2xl mr-2" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  FashionYuva
                </h1>
                <p className="text-sm text-black font-bold">
                  Fashion that speaks your style
                </p>
                <p className="text-sm text-black mt-1">www.fashionyuva.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">INVOICE</h2>
              <p className="text-sm text-black font-bold">
                Order #{invoiceData.orderNumber}
              </p>
              <p className="text-sm text-black font-bold">
                Date: {invoiceData.orderDate}
              </p>
            </div>
          </div>

          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-black font-semibold mb-2">Bill To:</h3>
            <div className="text-sm">
              <p className="font-medium">{invoiceData.customerDetails.name}</p>
              <p>{invoiceData.customerDetails.email}</p>
              <p>{invoiceData.customerDetails.address}</p>
              <p>
                {invoiceData.customerDetails.city} -{' '}
                {invoiceData.customerDetails.pincode}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-2 px-4 rounded-tl-lg">Item</th>
                  <th className="text-center py-2 px-4">Quantity</th>
                  <th className="text-right py-2 px-4">Price</th>
                  <th className="text-right py-2 px-4 rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 px-4">{item.item.title}</td>
                    <td className="text-center py-2 px-4">{item.quantity}</td>
                    <td className="text-right py-2 px-4">
                      {format(item.item.price.toLocaleString())}
                    </td>
                    <td className="text-right py-2 px-4">
                      {format(
                        (item.quantity * item.item.price).toLocaleString()
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-3">
              <div className="flex justify-between">
                <span className="text-black">Subtotal:</span>
                <span>{format(invoiceData.subtotal.toLocaleString())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Shipping:</span>
                <span>{format(invoiceData.shipping.toLocaleString())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">VAT (18%):</span>
                <span>{format(invoiceData.tax.toLocaleString())}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>{format(invoiceData.total.toLocaleString())}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-sm text-black">
            <p className="font-bold text-black mb-2">
              Thank you for shopping with FashionYuva!
            </p>
            <p>For any queries, please contact us at:</p>
            <p>Email: support@fashionyuva.com | Phone: +254 123456789</p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => window.print()}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors print:hidden text-lg font-medium"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Invoice
