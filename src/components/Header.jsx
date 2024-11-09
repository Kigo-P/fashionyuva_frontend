import { Link } from 'react-router-dom'
import React from 'react'


const Header = () => {
  return (
    <div>
      <Link to="/about-us">About Us</Link>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/Register">Register</Link>
    </div>
  )
}

export default Header
