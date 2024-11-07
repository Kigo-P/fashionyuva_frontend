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
import About from './routes/About'
import Listing from './routes/Listing'
import NewProductForm from './routes/NewProductForm'
import Product from './routes/Product'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
      <Route
        path="/listing"
        element={<Listing />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/about-us"
        element={<About />}
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
