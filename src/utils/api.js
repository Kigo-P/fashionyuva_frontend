import store from '../store/store'
import { setIdentity } from '../store/slices/identitySlice'
import { toast } from 'react-toastify'

const refreshAccessToken = async (refreshToken, retries = 3) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return refreshAccessToken(refreshToken, retries - 1)
    }

    toast('Session expired!', { type: 'info' })
    store.dispatch(
      setIdentity({
        is_logged: false,
        access_token: '',
        refresh_token: '',
        user: {
          username: '',
          email: '',
          phone_number: '',
          user_role: '',
        },
      })
    )
    throw new Error('Failed to refresh access token after multiple attempts')
  }
}

export const api = async (
  endpoint,
  method = 'GET',
  payload = null,
  customHeaders = {}
) => {
  const state = store.getState()
  const accessToken = state.identity.access_token
  const refreshToken = state.identity.refresh_token

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...customHeaders,
  }

  try {
    let response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      {
        method,
        headers,
        body: payload ? JSON.stringify(payload) : null,
      }
    )

    if (response.status === 401 || response.status === 500) {
      try {
        const newAccessToken = await refreshAccessToken(refreshToken)

        if (newAccessToken) {
          store.dispatch(
            setIdentity({
              ...state.identity,
              access_token: newAccessToken,
            })
          )

          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
          }

          response = await fetch(endpoint, {
            method,
            headers: retryHeaders,
            body: payload ? JSON.stringify(payload) : null,
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    return response
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}
