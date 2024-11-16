import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Package,
  User,
  DollarSign,
  Calendar,
  Truck,
  Search,
} from 'lucide-react'
import { useAppSelector } from '../../../store/hooks/'

const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse border border-gray-300 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-300 rounded-full w-10 h-10"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
    </div>
  )
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const identity = useAppSelector((state) => state.identity)

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, dateFilter])

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        {
          headers: { Authorization: `Bearer ${identity?.access_token}` },
        }
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      setOrders(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.user.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.user.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toString().includes(searchTerm)
      )
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.created_at)
        return orderDate.toDateString() === filterDate.toDateString()
      })
    }

    setFilteredOrders(filtered)
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(
      selectedOrder && selectedOrder.id === order.id ? null : order
    )
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>
        <SkeletonLoader />
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name, email, or order ID"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 relative">
          <input
            type="date"
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
          />
          <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex items-center space-x-4">
                <Package className="w-6 h-6" />
                <span className="font-semibold">Order #{order.id}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                {selectedOrder && selectedOrder.id === order.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
            {selectedOrder && selectedOrder.id === order.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Order Details
                    </h3>
                    <p className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 mr-2" />
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Total: ${order.total_price.toFixed(2)}
                    </p>
                    <p className="flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Status: {order.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Customer Information
                    </h3>
                    <p className="flex items-center mb-2">
                      <User className="w-5 h-5 mr-2" />
                      {order.user.first_name} {order.user.last_name}
                    </p>
                    <p className="mb-2">{order.user.email}</p>
                    <p>{order.user.contact}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Products</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">Quantity</th>
                        <th className="p-2 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderproduct.map((item) => (
                        <tr key={item.id} className="border-t border-gray-200">
                          <td className="p-2">{item.product.title}</td>
                          <td className="p-2">{item.quantity}</td>
                          <td className="p-2">
                            $
                            {(
                              (item.product.price * item.quantity) /
                              100
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-green-100 text-green-800'
    case 'delivered':
      return 'bg-green-200 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default Orders
