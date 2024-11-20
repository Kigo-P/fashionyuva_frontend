import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const ProtectedRoutes = () => {
  const user = useAppSelector((state) => state.identity)
  let location = useLocation()
  return user.is_logged && user.user.user_role.toLowerCase() === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
