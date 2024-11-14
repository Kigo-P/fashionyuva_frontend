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
} from 'lucide-react'

const Sidebar = ({ minified = false }) => {
  const playtab = useAppSelector((state) => state.admintab).tab
  const dispatch = useAppDispatch()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home style={{ color: '#fff', fontSize: 18 }} />,
      key: 'dashboard',
    },
    {
      name: 'New Product',
      icon: <Plus style={{ color: '#fff', fontSize: 18 }} />,
      key: 'new-product',
    },
    {
      name: 'Products',
      icon: <ShoppingBag style={{ color: '#fff', fontSize: 18 }} />,
      key: 'products',
    },
    {
      name: 'Categories',
      icon: <Layers style={{ color: '#fff', fontSize: 18 }} />,
      key: 'categories',
    },
    {
      name: 'Users',
      icon: <Users style={{ color: '#fff', fontSize: 18 }} />,
      key: 'users',
    },
    {
      name: 'Admins',
      icon: <UserCog style={{ color: '#fff', fontSize: 18 }} />,
      key: 'admins',
    },
    {
      name: 'Newsletter',
      icon: <Mail style={{ color: '#fff', fontSize: 18 }} />,
      key: 'newsletter',
    },
    {
      name: 'Contacts',
      icon: <MessageCircle style={{ color: '#fff', fontSize: 18 }} />,
      key: 'contacts',
    },
  ]

  return (
    <div className="">
      <ul className="m-4">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`flex items-center ${
              minified ? 'justify-center' : ''
            } gap-2 p-4 ${
              playtab === item.key ? 'bg-[#000000d7]' : 'bg-[#0005]'
            } rounded cursor-pointer mb-2 overflow-hidden`}
            onClick={() => dispatch(setAdminTab({ tab: item.key }))}
          >
            {item.icon}
            {!minified && (
              <span className="text-xs text-nowrap text-white">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
