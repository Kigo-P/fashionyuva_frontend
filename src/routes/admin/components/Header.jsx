import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ChevronsRight, CircleUser, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/'
import { setIdentity } from '../../../store/slices/identitySlice'

const Header = ({ minified, setMinified }) => {
  const [profiledrop, setProfileDrop] = useState(false)
  const [loading, setLoading] = useState(false)
  const profileDropRef = useRef(null)
  const identity = useAppSelector((state) => state.identity)
  const dispatch = useAppDispatch()

  const handleClickOutside = (event) => {
    if (
      profileDropRef.current &&
      !profileDropRef.current.contains(event.target)
    ) {
      setProfileDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${identity.access_token}`,
          },
        }
      )
      setLoading(false)
      if (res.ok || res.status === 401) {
        dispatch(
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
        toast('Logout successful', { type: 'success' })
      } else {
        toast('Logout unsuccessful', { type: 'error' })
      }
    } catch (error) {
      setLoading(false)
      console.error('Logout error:', error)
      toast('Network error. Please try again.', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full">
      <div className="h-full flex items-center justify-between">
        <div className="pl-4 flex items-center justify-start gap-2">
          <ChevronsRight
            style={{ color: '#000', fontSize: 24 }}
            className={`cursor-pointer ${
              minified ? '' : 'rotate-180'
            } transition-all`}
            onClick={() => {
              setMinified(!minified)
            }}
          />
          <Link
            to="/"
            className="text-black text-2xl font-extrabold uppercase text-nowrap ml-2"
            style={{ fontFamily: 'Itim, cursive' }}
          >
            FashionYuva
          </Link>
        </div>
        <div className="pr-4 flex items-center justify-end gap-4">
          <Bell
            style={{ color: '#000', fontSize: 24 }}
            className={`cursor-pointer`}
            onClick={() => {}}
          />
          {identity.is_logged ? (
            <div
              ref={profileDropRef}
              className="flex items-center justify-center gap-2 relative"
            >
              <div
                className="flex flex-nowrap items-center justify-center gap-2 bg-black p-1 pl-3 cursor-pointer rounded-full"
                onClick={() => {
                  setProfileDrop(!profiledrop)
                }}
              >
                <span className="text-white text-xs">
                  {identity.user?.username}
                </span>

                <CircleUser
                  style={{ color: '#fff', fontSize: 18 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setProfileDrop(!profiledrop)
                  }}
                />
              </div>
              {profiledrop && (
                <div
                  className="absolute top-8 right-0 bg-white h-auto w-[100px] rounded shadow z-50 overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <ul>
                    <li
                      className="p-2 cursor-pointer hover:bg-[#0005] flex items-center justify-start gap-2"
                      onClick={() => {
                        handleLogout()
                      }}
                    >
                      {loading ? (
                        <span
                          className="mr-2 inline-block w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"
                          role="status"
                        ></span>
                      ) : (
                        <div className="">
                          <LogOut style={{ color: '#000', fontSize: 18 }} />
                        </div>
                      )}
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-slate-200 py-2 px-4 rounded-md cursor-pointer text-white text-xs"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
