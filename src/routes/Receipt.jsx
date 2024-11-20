import React, { useEffect, useState, useRef } from 'react'
import { Store } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'

function ReceiptSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 relative mt-10">
      <div className="absolute inset-0 bg-gray-200 opacity-70"></div>
      <div className="fixed top-20 right-2 w-40 h-10 bg-gray-300 animate-pulse rounded-lg"></div>

      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <div className="bg-gray-300 animate-pulse h-16 w-16 mr-2 rounded-full"></div>
            <div>
              <div className="bg-gray-300 animate-pulse h-8 w-40 mb-2 rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-48 mb-1 rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-36 rounded"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-gray-300 animate-pulse h-8 w-24 mb-2 rounded ml-auto"></div>
            <div className="bg-gray-300 animate-pulse h-4 w-32 mb-1 rounded ml-auto"></div>
            <div className="bg-gray-300 animate-pulse h-4 w-28 rounded ml-auto"></div>
          </div>
        </div>

        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="bg-gray-300 animate-pulse h-6 w-24 mb-2 rounded"></div>
          <div className="space-y-2">
            <div className="bg-gray-300 animate-pulse h-4 w-48 rounded"></div>
            <div className="bg-gray-300 animate-pulse h-4 w-40 rounded"></div>
            <div className="bg-gray-300 animate-pulse h-4 w-64 rounded"></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              {['Item', 'Quantity', 'Price', 'Total'].map((header, index) => (
                <div
                  key={index}
                  className="bg-gray-300 animate-pulse h-6 w-16 rounded"
                ></div>
              ))}
            </div>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between py-2 border-b border-gray-100"
              >
                <div className="bg-gray-300 animate-pulse h-4 w-1/3 rounded"></div>
                <div className="bg-gray-300 animate-pulse h-4 w-12 rounded"></div>
                <div className="bg-gray-300 animate-pulse h-4 w-16 rounded"></div>
                <div className="bg-gray-300 animate-pulse h-4 w-20 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-3">
            {['Subtotal', 'Shipping', 'VAT (18%)', 'Total'].map(
              (item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="bg-gray-300 animate-pulse h-4 w-20 rounded"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-24 rounded"></div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center">
          <div className="bg-gray-300 animate-pulse h-4 w-64 mx-auto mb-2 rounded"></div>
          <div className="bg-gray-300 animate-pulse h-4 w-48 mx-auto mb-1 rounded"></div>
          <div className="bg-gray-300 animate-pulse h-4 w-72 mx-auto rounded"></div>
        </div>

        <div className="mt-8">
          <div className="bg-gray-300 animate-pulse h-12 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

const Receipt = () => {
  const [order, setOrder] = useState(null)
  const divToPrintRef = useRef()
  const { id } = useParams()

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api(`/orders/${id}`)
      const data = await res.json()
      if (res.ok) {
        setOrder(data)
      }
    }
    fetchOrder()
  }, [id])

  if (!order) {
    return <ReceiptSkeleton />
  }

  const format = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  const subtotal = order.orderproduct.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  )
  const shipping = 0
  const taxRate = 0.18
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  const handlePrint = () => {
    const originalContents = document.body.innerHTML
    const printContents = divToPrintRef.current.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
    window.location.reload()
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

        <div
          className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg relative z-10"
          ref={divToPrintRef}
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center">
              <Store className="text-gray-800 text-4xl h-16 w-16 mr-2" />
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
              <h2 className="text-xl font-bold text-gray-800">RECEIPT</h2>
              <p className="text-sm text-black font-bold">
                Order {order.receipt_no}
              </p>
              <p className="text-sm text-black font-bold">
                Date: {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-black font-semibold mb-2">Bill To:</h3>
            <div className="text-sm">
              <p className="font-medium">
                {order.user.first_name} {order.user.last_name}
              </p>
              <p>{order.user.email}</p>
              {order.user.address.length > 0 && (
                <p>
                  {order.user.address[0].address}, {order.user.address[0].town},{' '}
                  {order.user.address[0].county},{' '}
                  {order.user.address[0].country} -{' '}
                  {order.user.address[0].zip_code}
                </p>
              )}
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
                {order.orderproduct.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 px-4">{item.product.title}</td>
                    <td className="text-center py-2 px-4">{item.quantity}</td>
                    <td className="text-right py-2 px-4">
                      {format(item.product.price)}
                    </td>
                    <td className="text-right py-2 px-4">
                      {format(item.quantity * item.product.price)}
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
                <span>{format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">VAT (18%):</span>
                <span>{format(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>{format(total)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-sm text-black">
            <p className="font-bold text-black mb-2">
              Thank you for shopping with FashionYuva!
            </p>
            <p>For any queries, please contact us at:</p>
            <p>Email: hello@fashionyuva.com | Phone: +254715503942</p>
          </div>

          <div className="mt-8">
            <button
              // onClick={() => window.print()}
              onClick={handlePrint}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors print:hidden text-lg font-medium"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Receipt
