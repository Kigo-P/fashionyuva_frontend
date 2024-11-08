import { Link } from 'react-router-dom'
import { Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We're sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-2 bg-black rounded-md text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
