import React, { useState, useEffect } from 'react'
import { Trash2, Plus, X, ChevronUp, ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../store/hooks/'

const Admins = () => {
  const [admins, setAdmins] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })
  const identity = useAppSelector((state) => state.identity)

  const fetchUsersAndAdmins = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity?.access_token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data.filter((user) => user.user_role !== 'admin'))
      setAdmins(data.filter((user) => user.user_role === 'admin'))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsersAndAdmins()
  }, [])

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handlePromoteUser = async (userId) => {
    try {
      const userToPromote = users.find((user) => user.id === userId)
      if (!userToPromote) return

      const updatedAdmin = { ...userToPromote, user_role: 'admin' }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity?.access_token}`,
          },
          body: JSON.stringify(updatedAdmin),
        }
      )
      if (!response.ok) throw new Error('Failed to promote user')

      const promotedUser = await response.json()
      setAdmins((prevAdmins) => [...prevAdmins, promotedUser])
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      setIsModalOpen(false)
      fetchUsersAndAdmins()
    } catch (err) {
      toast(err.message, { type: 'error' })
    }
  }

  const sortedAdmins = [...admins].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const handleDemoteAdmin = async (userId) => {
    try {
      const userToDemote = admins.find((admin) => admin.id === userId)
      if (!userToDemote) throw new Error('Admin not found!')

      const updatedUser = { ...userToDemote, user_role: 'customer' }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${identity?.access_token}`,
            },
          },
          body: JSON.stringify({ user_role: 'customer' }),
        }
      )
      if (!response.ok) throw new Error('Failed to demote admin')

      const demotedUser = await response.json()

      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== userId)
      )
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, user_role: 'customer' } : user
        )
      )
      fetchUsersAndAdmins()
    } catch (err) {
      toast(err.message, { type: 'error' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admins</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Promote User to Admin
        </button>
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
                  Name
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
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center"
                  onClick={() => handleSort('role')}
                >
                  Role
                  {sortConfig.key === 'role' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </button>
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Joined At
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))
              : sortedAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.first_name + ' ' + admin.last_name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.user_role}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.created_at}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 flex space-x-2">
                      <button onClick={() => handleDemoteAdmin(admin.id)}>
                        <Trash2 className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-[80vw] relative h-[80vh]">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Promote User to Admin</h2>
            <ul className="space-y-4 h-[70vh] overflow-y-scroll overflow-x-hidden">
              {loading ? (
                <div className="animate-pulse">Loading...</div>
              ) : (
                users.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                  >
                    <span>
                      {user.first_name} {user.last_name} ({user.email})
                    </span>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-md"
                      onClick={() => handlePromoteUser(user.id)}
                    >
                      Promote
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  )
}

export default Admins
