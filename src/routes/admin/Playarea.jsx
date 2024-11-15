import React from 'react'
import { useAppSelector } from '../../store/hooks'
import Dash from './views/Dash'
import NewProduct from './views/NewProduct'
import Products from './views/Products'
import Categories from './views/Categories'
import Users from './views/Users'
import Admins from './views/Admins'
import Newsletter from './views/Newsletter'
import Contacts from './views/Contacts'
import Orders from './views/Orders'

const Playarea = () => {
  const playtab = useAppSelector((state) => state.admintab).tab
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent">
      <div className="p-2">
        {playtab === 'dashboard' ? (
          <Dash />
        ) : playtab === 'new-product' ? (
          <NewProduct />
        ) : playtab === 'products' ? (
          <Products />
        ) : playtab === 'categories' ? (
          <Categories />
        ) : playtab === 'users' ? (
          <Users />
        ) : playtab === 'admins' ? (
          <Admins />
        ) : playtab === 'newsletter' ? (
          <Newsletter />
        ) : playtab === 'contacts' ? (
          <Contacts />
        ) : playtab === 'orders' ? (
          <Orders />
        ) : (
          <Dash />
        )}
      </div>
    </div>
  )
}

export default Playarea
