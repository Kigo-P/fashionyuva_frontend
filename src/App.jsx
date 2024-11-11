import { useEffect } from 'react'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  useEffect(() => {
    const server = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wake`)
        if (!res.ok) {
          console.error('Failed to reach /wake endpoint')
        }
      } catch (error) {
        console.error('Error fetching /wake:', error)
      }
    }
    const intervalId = setInterval(server, 60000)
    server()
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  )
}

export default App
