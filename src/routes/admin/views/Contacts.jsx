import React, { useState, useEffect } from 'react'
import { Mail, Phone, Calendar, ChevronRight, X } from 'lucide-react'

export default function Component() {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/contacts`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch contacts')
        }
        const data = await response.json()
        setContacts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchContacts()
  }, [])

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contacts/${id}`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        throw new Error('Failed to delete contact')
      }
      setContacts(contacts.filter((contact) => contact.id !== id))
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddContact = async (newContact) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contacts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newContact),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to add contact')
      }
      const addedContact = await response.json()
      setContacts([...contacts, addedContact])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdateContact = async (updatedContact) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contacts/${updatedContact.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedContact),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to update contact')
      }
      const updated = await response.json()
      setContacts(
        contacts.map((contact) =>
          contact.id === updated.id ? updated : contact
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-200">
          Contacts
        </h2>
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-200 flex justify-between items-center"
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => setSelectedContact(contact)}
            >
              <div>
                <h3 className="font-semibold">
                  {contact.first_name + ' ' + contact.last_name}
                </h3>
                <p className="text-sm text-gray-600">{contact.email}</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          ))
        )}
      </div>

      <div className="w-2/3 p-8">
        {selectedContact ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {selectedContact.first_name + ' ' + selectedContact.last_name}
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <Mail className="mr-2" size={18} />
                {selectedContact.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="mr-2" size={18} />
                {selectedContact.contact}
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Message:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact to view details
          </div>
        )}
      </div>
    </div>
  )
}
