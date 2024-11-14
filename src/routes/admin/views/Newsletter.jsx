import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, X, ChevronUp, ChevronDown } from 'lucide-react'

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/newsletters`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch newsletters')
        }
        const data = await response.json()
        setNewsletters(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNewsletters()
  }, [])

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortNewsletters = [...newsletters].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
    }
    return 0
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Newsletters</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center"
                  onClick={() => handleSort('name')}
                >
                  ID
                  {sortConfig.key === 'name' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </button>
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center"
                  onClick={() => handleSort('email')}
                >
                  Email
                  {sortConfig.key === 'email' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortNewsletters.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {admin.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {admin.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Newsletter
