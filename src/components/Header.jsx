import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="h-10 w-full bg-red-600 text-red-600">
      <Link to="/about-us" className="text-red-600">
        About Us
      </Link>
    </div>
  )
}

export default Header
