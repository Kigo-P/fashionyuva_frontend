import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sale', href: '/sale' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="bg-[#242424] shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          LUXE
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-gray-100 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="border border-slate-200 py-2 px-4 rounded-md cursor-pointer text-white text-xs"
          >
            Sign in / Sign up
          </Link>
          <Link
            href="/cart"
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
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-white transition-colors"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2 flex items-center justify-between">
            <Link
              href="/login"
              className="border border-slate-200 py-2 px-4 rounded-md cursor-pointer text-white text-xs"
            >
              Sign in / Sign up
            </Link>
            <Link
              href="/cart"
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
