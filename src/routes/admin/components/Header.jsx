import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Bell, ChevronsRight, CircleUser, LogOut } from 'lucide-react'

const Header = ({ minified, setMinified }) => {
  const [profiledrop, setProfileDrop] = useState(false)
  const profileDropRef = useRef(null)

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

  const handleLogout = async () => {}
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
          <div
            className="relative"
            ref={profileDropRef}
            onClick={() => {
              setProfileDrop(!profiledrop)
            }}
          >
            <div className="h-8 w-8 rounded-[50%] overflow-hidden">
              <img
                className="w-full h-full object-cover cursor-pointer"
                src="https://picsum.photos/400/300?id=fdg54sd"
                alt="profile picture"
              />
            </div>
            {profiledrop && (
              <div
                className="absolute top-14 right-0 bg-white h-auto w-[100px] rounded shadow z-10 overflow-hidden"
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
                    <div className="">
                      <LogOut style={{ color: '#000', fontSize: 18 }} />
                    </div>{' '}
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
