import { Link } from 'react-router-dom'
import { RefreshCcw, Home } from 'lucide-react'

const ErrorBoundary = ({ error, reset }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-2">500</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We apologize for the inconvenience. Our team has been notified and
            is working on the issue.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="flex items-center justify-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </button>

          <Link href="/" className="flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
