import React, { useState } from 'react'
import Header from './components/Header'
import Playarea from './Playarea'
import Sidebar from './components/Sidebar'

const Dashboard = () => {
  const [minified, setMinified] = useState(false)
  return (
    <div className="mx-auto">
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 h-screen overflow-hidden">
          <div
            className={`${
              minified ? 'w-[7%]' : 'w-[20%]'
            } border-r border-slate-500 transition-all`}
          >
            <Sidebar minified={minified} />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="h-16 border-b border-slate-500">
              <Header minified={minified} setMinified={setMinified} />
            </div>
            <div className="flex-1">
              <Playarea />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
