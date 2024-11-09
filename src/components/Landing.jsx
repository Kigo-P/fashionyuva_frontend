import React from 'react'
import LandingImage from '../assets/img/landing_image.png'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src={LandingImage}
        alt="Luxury Fashion Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Elevate Your Style
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          Discover our exquisite collection of luxury fashion pieces
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/listing"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
