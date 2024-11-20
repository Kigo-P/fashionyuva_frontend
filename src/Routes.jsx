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
import Product from './routes/Product'
import Login from './routes/Login'
import ContactUs from './routes/ContactUs.jsx'
import AddUser from './routes/AddUser.jsx'
import UpdateProductForm from './routes/UpdateProductForm.jsx'
import Cart from './routes/Cart.jsx'
import Checkout from './routes/Checkout.jsx'
import Dashboard from './routes/admin/Dashboard.jsx'
import Receipt from './routes/Receipt.jsx'
import Mpesa from './routes/Mpesa.jsx'
import ProtectedRoutes from './utils/PrivateRoute.jsx'

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
      <Route path="/cart" element={<Cart />} errorElement={<ErrorBoundary />} />
      <Route
        path="/checkout"
        element={<Checkout />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/product/:id"
        element={<Product />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/adduser"
        element={<AddUser />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/update-product"
        element={<UpdateProductForm />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/receipt/:id"
        element={<Receipt />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/mpesa"
        element={<Mpesa />}
        errorElement={<ErrorBoundary />}
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
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
