import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, CircleUser, LogOut } from 'lucide-react'
import { useAppSelector } from '../store/hooks'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profDrop, setProfDrop] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const profDropRef = useRef(null)

  const identity = useAppSelector((state) => state.identity)

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

  return (
    <header className="bg-[#242424] shadow-md">
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
                <span className="text-white text-xs">Dennis Kibet</span>

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
                    <Link
                      href="/profile"
                      className="p-2 cursor-pointer hover:bg-[#0005] flex items-center justify-start gap-2"
                    >
                      <div className="">
                        <CircleUser style={{ color: '#000', fontSize: 18 }} />
                      </div>{' '}
                      <span>Profile</span>
                    </Link>
                    <li
                      className="p-2 cursor-pointer hover:bg-[#0005] flex items-center justify-start gap-2"
                      onClick={() => {
                        handleLogout()
                      }}
                    >
                      <div className="">
                        <LogOut style={{ color: '#000', fontSize: 18 }} />
                      </div>{' '}
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
              Sign in / Sign up
            </Link>
          )}
          <Link
            to="/cart"
            className="text-white hover:text-white transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
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
              Sign in / Sign up
            </Link>
            <Link
              to="/cart"
              className="text-white hover:text-white transition-colors"
            >
              <ShoppingBag className="h-6 w-6 text-white" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
