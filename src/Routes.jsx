import { Fragment } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ErrorBoundary from './routes/ErrorBoundary'
import NotFound from './routes/NotFound'
import Home from './routes/Home'
import AboutUs from './routes/AboutUs.jsx'
import Listing from './routes/Listing'
import NewProductForm from './routes/NewProductForm'
import Product from './routes/Product'
import Login from './routes/Login'
import Register from './routes/Register'
import ContactUs from './routes/ContactUs.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
      <Route
        path="/login"
        element={<Login />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/register"
        element={<Register />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/dashboard"
        element={<AdminDashboard />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/listing"
        element={<Listing />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/about"
        element={<AboutUs />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/contact"
        element={<ContactUs />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/new-product-form"
        element={<NewProductForm />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/product/:id"
        element={<Product />}
        errorElement={<ErrorBoundary />}
      />
      <Route path="*" element={<NotFound />} errorElement={<ErrorBoundary />} />
    </>
  )
)

const Routes = () => {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}

export default Routes
