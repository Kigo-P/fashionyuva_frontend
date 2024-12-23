import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, CircleUser, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toast } from 'react-toastify'
import { setIdentity } from '../store/slices/identitySlice'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profDrop, setProfDrop] = useState(false)
  const [loading, setLoading] = useState(false)
  const cart = useAppSelector((state) => state.cart).cart
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const profDropRef = useRef(null)

  const identity = useAppSelector((state) => state.identity)
  const dispatch = useAppDispatch()

  const handleClickOutside = (event) => {
    if (profDropRef.current && !profDropRef.current.contains(event.target)) {
      setProfDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleLogout = async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity.access_token}`,
          },
        }
      )
      setLoading(false)
      if (res.ok || res.status === 401) {
        dispatch(
          setIdentity({
            is_logged: false,
            access_token: '',
            refresh_token: '',
            user: {
              username: '',
              email: '',
              phone_number: '',
              user_role: '',
            },
          })
        )
        toast('Logout successful', { type: 'success' })
      } else {
        toast('Logout unsuccessful', { type: 'error' })
      }
    } catch (error) {
      setLoading(false)
      console.error('Logout error:', error)
      toast('Network error. Please try again.', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-[#242424] shadow-md !p-[unset] !border-none fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          FASHIONYUVA
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-white hover:text-gray-100 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {identity.is_logged ? (
            <div
              ref={profDropRef}
              className="flex items-center justify-center gap-2 relative"
            >
              <div
                className="flex flex-nowrap items-center justify-center gap-2 bg-black p-1 pl-3 cursor-pointer rounded-full"
                onClick={() => {
                  setProfDrop(!profDrop)
                }}
              >
                <span className="text-white text-xs">
                  {identity.user?.username}
                </span>

                <CircleUser
                  style={{ color: '#fff', fontSize: 18 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setProfDrop(!profDrop)
                  }}
                />
              </div>
              {profDrop && (
                <div
                  className="absolute top-8 right-0 bg-white h-auto w-[100px] rounded shadow z-50 overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <ul>
                    <li
                      className="p-2 cursor-pointer hover:bg-[#0005] flex items-center justify-start gap-2"
                      onClick={() => {
                        handleLogout()
                      }}
                    >
                      {loading ? (
                        <span
                          className="mr-2 inline-block w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"
                          role="status"
                        ></span>
                      ) : (
                        <div className="">
                          <LogOut style={{ color: '#000', fontSize: 18 }} />
                        </div>
                      )}
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-slate-200 py-2 px-4 rounded-md cursor-pointer text-white text-xs"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/cart"
            className="text-white hover:text-white transition-colors relative"
          >
            <ShoppingBag className="h-6 w-6" />
            {Array.isArray(cart) ? (
              <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-red-600 h-4 w-4  rounded-full flex items-center justify-center gap-2">
                <span className="font-semibold text-white text-[11px]">
                  {cart.length}
                </span>
              </div>
            ) : null}
          </Link>
        </div>

        <button
          className="md:hidden text-gray-600 hover:text-black transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-[#242424] py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-4 py-2 text-white transition-colors"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2 flex items-center justify-between">
            <Link
              to="/login"
              className="border border-slate-200 py-2 px-4 rounded-md cursor-pointer text-white text-xs"
            >
              Sign in
            </Link>
            <Link
              to="/cart"
              className="text-white hover:text-white transition-colors relative"
            >
              <ShoppingBag className="h-6 w-6 text-white" />
              {Array.isArray(cart) ? (
                <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-red-600 h-4 w-4  rounded-full flex items-center justify-center gap-2">
                  <span className="font-semibold text-white text-[11px]">
                    {cart.length}
                  </span>
                </div>
              ) : null}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
