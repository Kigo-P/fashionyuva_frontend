import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const Dash = () => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [],
  })
  const [dailysales, setDailySales] = useState({
    labels: [],
    datasets: [],
  })
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    avgOrderValue: 0,
  })
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const endpoints = [
          `${import.meta.env.VITE_BACKEND_URL}/total-sales`,
          `${import.meta.env.VITE_BACKEND_URL}/total-orders`,
          `${import.meta.env.VITE_BACKEND_URL}/total-customers`,
          `${import.meta.env.VITE_BACKEND_URL}/average-order-value`,
          `${import.meta.env.VITE_BACKEND_URL}/monthly-sales`,
          `${import.meta.env.VITE_BACKEND_URL}/daily-sales`,
          `${import.meta.env.VITE_BACKEND_URL}/top-selling-products`,
        ]

        const [
          totalSalesRes,
          totalOrdersRes,
          totalCustomersRes,
          avgOrderValueRes,
          monthlySalesRes,
          dailySalesRes,
          topProductsRes,
        ] = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint)
              .then((res) => res.json())
              .catch((err) => ({ error: err.message }))
          )
        )

        // Update stats
        setStats({
          totalSales: totalSalesRes?.data?.total_sales || 0,
          totalOrders: totalOrdersRes?.data?.total_orders || 0,
          totalCustomers: totalCustomersRes?.data?.total_customers || 0,
          avgOrderValue: avgOrderValueRes?.data?.avg_order_value || 0,
        })

        // Update monthly sales data
        setSalesData({
          labels: monthlySalesRes?.data?.map((i) => i.month) || [],
          datasets: [
            {
              label: 'Sales',
              data: monthlySalesRes?.data?.map((i) => i.sales) || [],
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 1,
            },
          ],
        })

        // Update daily sales data
        setDailySales({
          labels: dailySalesRes?.data?.map((i) => i.date) || [],
          datasets: [
            {
              label: 'Daily Sales',
              data: dailySalesRes?.data?.map((i) => i.sales) || [],
              borderColor: 'rgba(0, 0, 0, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              tension: 0.4,
            },
          ],
        })

        // Update top products
        setTopProducts(topProductsRes?.data || [])
      } catch (error) {
        console.error('Error fetching data:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const format = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount || 0)
  }

  if (loading) {
    return <SkeletonLoader />
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value={`${format(stats?.totalSales)}`}
            change="+15%"
          />
          <StatCard title="Orders" value={stats?.totalOrders} change="+8%" />
          <StatCard
            title="Customers"
            value={stats?.totalCustomers}
            change="+12%"
          />
          <StatCard
            title="Avg. Order Value"
            value={`${format(stats?.avgOrderValue)}`}
            change="+5%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
            {salesData?.datasets?.length > 0 ? (
              <Bar data={salesData} options={chartOptions} />
            ) : (
              <p>No data available for Monthly Sales</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Daily Sales</h2>
            {dailysales?.datasets?.length > 0 ? (
              <Line data={dailysales} options={chartOptions} />
            ) : (
              <p>No data available for Daily Sales</p>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Total Sold</th>
                </tr>
              </thead>
              <tbody>
                {topProducts?.length ? (
                  topProducts.map((product, i) => (
                    <TableRow
                      key={i}
                      product={product?.title || 'Unknown Product'}
                      total_sold={product?.total_sold || 0}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      No top-selling products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

const SkeletonLoader = () => (
  <div className="min-h-screen bg-gray-100 px-4 py-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 h-24 rounded-lg animate-pulse"
            ></div>
          ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-300 h-64 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-64 rounded-lg animate-pulse"></div>
      </div>
      <div className="mt-8 bg-gray-300 rounded-lg p-6 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-400 rounded mb-4 animate-pulse"></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <th
                      key={index}
                      className="h-4 bg-gray-400 rounded w-1/6 animate-pulse"
                    ></th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {Array(2)
                      .fill(0)
                      .map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="py-2 bg-gray-300 h-4 rounded animate-pulse"
                        ></td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-2">{value}</p>
    <p
      className={`text-sm ${
        change?.includes('-') ? 'text-red-500' : 'text-green-500'
      }`}
    >
      {change}
    </p>
  </div>
)

const TableRow = ({ product, total_sold }) => (
  <tr>
    <td className="py-2">{product}</td>
    <td className="py-2">{total_sold}</td>
  </tr>
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
}

export default Dash
