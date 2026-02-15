import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const SidebarNav = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className='flex justify-center items-center pt-20 sm:pl-64 min-h-dvh dark:bg-gray-900 dark:text-gray-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default SidebarNav
