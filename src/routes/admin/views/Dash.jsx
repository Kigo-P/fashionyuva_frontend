import React from 'react'
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
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  }

  const visitorData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Visitors',
        data: [1500, 2000, 1800, 2200, 2500, 3000, 2800],
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Sales" value="$123,456" change="+15%" />
          <StatCard title="Orders" value="1,234" change="+8%" />
          <StatCard title="Customers" value="5,678" change="+12%" />
          <StatCard title="Avg. Order Value" value="$99" change="+5%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
            <Bar data={salesData} options={chartOptions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Weekly Visitors</h2>
            <Line data={visitorData} options={chartOptions} />
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Sales</th>
                  <th className="py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <TableRow
                  product="Elegant Black Dress"
                  category="Dresses"
                  sales="234"
                  revenue="$11,700"
                />
                <TableRow
                  product="Designer Sunglasses"
                  category="Accessories"
                  sales="189"
                  revenue="$9,450"
                />
                <TableRow
                  product="Leather Handbag"
                  category="Bags"
                  sales="156"
                  revenue="$15,600"
                />
                <TableRow
                  product="Men's Suit"
                  category="Formal Wear"
                  sales="132"
                  revenue="$26,400"
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-2">{value}</p>
    <p
      className={`text-sm ${
        change.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {change} vs last month
    </p>
  </div>
)

const TableRow = ({ product, category, sales, revenue }) => (
  <tr className="border-b">
    <td className="py-2">{product}</td>
    <td className="py-2">{category}</td>
    <td className="py-2">{sales}</td>
    <td className="py-2">{revenue}</td>
  </tr>
)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      type: 'category',
      grid: {
        display: false,
      },
    },
    y: {
      type: 'linear',
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
}

export default Dash
