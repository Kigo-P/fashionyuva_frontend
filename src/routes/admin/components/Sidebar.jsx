import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setAdminTab } from '../../../store/slices/admintabSlice'
import {
  Home,
  Layers,
  Mail,
  MessageCircle,
  Plus,
  ShoppingBag,
  UserCog,
  Users,
  Package,
} from 'lucide-react'

const Sidebar = ({ minified = false }) => {
  const playtab = useAppSelector((state) => state.admintab).tab
  const dispatch = useAppDispatch()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home size={18} />,
      key: 'dashboard',
    },
    {
      name: 'New Product',
      icon: <Plus size={18} />,
      key: 'new-product',
    },
    {
      name: 'Products',
      icon: <ShoppingBag size={18} />,
      key: 'products',
    },
    {
      name: 'Orders',
      icon: <Package size={18} />,
      key: 'orders',
    },
    {
      name: 'Categories',
      icon: <Layers size={18} />,
      key: 'categories',
    },
    {
      name: 'Users',
      icon: <Users size={18} />,
      key: 'users',
    },
    {
      name: 'Admins',
      icon: <UserCog size={18} />,
      key: 'admins',
    },
    {
      name: 'Newsletter',
      icon: <Mail size={18} />,
      key: 'newsletter',
    },
    {
      name: 'Contacts',
      icon: <MessageCircle size={18} />,
      key: 'contacts',
    },
  ]

  return (
    <nav className="bg-gray-900 text-gray-100 h-full">
      <ul className="p-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              className={`w-full flex items-center ${
                minified ? 'justify-center' : 'justify-start'
              } gap-3 p-3 rounded-lg transition-colors ${
                playtab === item.key
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => dispatch(setAdminTab({ tab: item.key }))}
              aria-current={playtab === item.key ? 'page' : undefined}
            >
              {React.cloneElement(item.icon, {
                className: `${
                  playtab === item.key
                    ? 'text-gray-900'
                    : 'text-gray-400 group-hover:text-white'
                }`,
              })}
              {!minified && (
                <span
                  className={`text-sm font-medium ${minified ? 'sr-only' : ''}`}
                >
                  {item.name}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
