import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useSidebar } from '../../contexts/SidebarContext'
import { Link } from 'react-router-dom'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const Navbar = () => {
  const { activeTab, setActiveTab, toggleSidebar, } = useSidebar()
  const {isDarkMode, toggleDarkMode,} = useTheme()

  const formatCamelCase = text => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase())
  }

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1]
    if(currentPath) {
      setActiveTab(formatCamelCase(currentPath))
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full h-20 border-b shadow-md transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-900 border-gray-700 shadow-gray-800'
          : 'bg-[#0D2C49] border-[#14385a] shadow-[#396a98]'
      }`}
    >
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start rtl:justify-end'>
            <button
              data-drawer-target='logo-sidebar'
              data-drawer-toggle='logo-sidebar'
              onClick={toggleSidebar}
              aria-controls='logo-sidebar'
              type='button'
              className={`inline-flex mr-2 items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 hover:bg-opacity-80 transition-all duration-300 ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700 focus:ring-gray-500'
                  : 'text-gray-400 hover:bg-[#14385a] focus:ring-gray-400'
              }`}
            >
              <span className='sr-only'>Open sidebar</span>
              <HiOutlineMenuAlt2 fontSize={'1.5rem'} />
            </button>
            <div className='hidden sm:flex sm:mx-20'>
              <img src="/SNS-new1.png" className='h-12 me-3 mt-1' alt='Logo' />
              {/* <h2 className='text-white text-3xl h-12 me-3 mt-3'>SNS</h2> */}
            </div>
            <div className='flex items-center justify-center sm:ml-10'>
              {/* <h2
                className={`text-2xl font-semibold transition-all duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-white'
                }`}
              >
                {formatCamelCase(activeTab)}
              </h2> */}
            </div>
          </div>

          <div className='flex items-center mr-4 gap-3'>
            <button
              onClick={toggleDarkMode}
              className={`w-16 h-8 relative rounded-full transition-all duration-500 ease-in-out ${
                isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-500 ease-in-out transform ${
                  isDarkMode
                    ? 'translate-x-8 bg-gray-800'
                    : 'translate-x-0 bg-yellow-400'
                } flex items-center justify-center`}
              >
                {isDarkMode ? (
                  <BsMoonStars className='w-4 h-4 text-white transition-all duration-500 ease-in-out' />
                ) : (
                  <BsSun className='w-4 h-4 text-yellow-600 transition-all duration-500 ease-in-out' />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
