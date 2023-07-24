import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Styles from './index.module.less'

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed}></Sidebar>
      <div className="flex-1 w-0 flex flex-dc h-vh">
        <Header onCollapsed={toggleCollapsed} collapsed={collapsed} />
        <div className={`flex-1 ${Styles.overflow}`}>
          <div className={`${Styles.wrap}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
