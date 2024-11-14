import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, X, ChevronUp, ChevronDown } from 'lucide-react'

const Admins = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Admin',
  })
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admins`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch admins')
        }
        const data = await response.json()
        setAdmins(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAdmins()
  }, [])

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
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

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admins`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAdmin),
        }
      )
      if (!response.ok) throw new Error('Failed to add admin')
      const addedAdmin = await response.json()
      setAdmins([...admins, addedAdmin])
      setNewAdmin({ name: '', email: '', role: 'Admin' })
      setIsModalOpen(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin)
    setNewAdmin(admin)
    setIsModalOpen(true)
  }

  const handleUpdateAdmin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admins/${editingAdmin.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAdmin),
        }
      )
      if (!response.ok) throw new Error('Failed to update admin')
      const updatedAdmin = await response.json()
      setAdmins(
        admins.map((admin) =>
          admin.id === editingAdmin.id ? updatedAdmin : admin
        )
      )
      setNewAdmin({ name: '', email: '', role: 'Admin' })
      setEditingAdmin(null)
      setIsModalOpen(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admins/${id}`,
        { method: 'DELETE' }
      )
      if (!response.ok) throw new Error('Failed to delete admin')
      setAdmins(admins.filter((admin) => admin.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admins</h1>
        <button
          onClick={() => {
            setNewAdmin({ name: '', email: '', role: 'Admin' })
            setEditingAdmin(null)
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Add Admin
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
                <button
                  className="flex items-center"
                  onClick={() => handleSort('lastLogin')}
                >
                  Last Login
                  {sortConfig.key === 'lastLogin' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </button>
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
                      {admin.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.role}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {admin.lastLogin}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 flex space-x-2">
                      <button onClick={() => handleEditAdmin(admin)}>
                        <Pencil />
                      </button>
                      <button onClick={() => handleDeleteAdmin(admin.id)}>
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {editingAdmin ? 'Edit Admin' : 'Add Admin'}
            </h2>
            <form onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin}>
              <label className="block mb-2">
                Name
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Email
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
              <label className="block mb-4">
                Role
                <select
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, role: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full"
              >
                {editingAdmin ? 'Update Admin' : 'Add Admin'}
              </button>
            </form>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  )
}

export default Admins
