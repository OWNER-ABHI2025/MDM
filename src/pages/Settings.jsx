import { useState } from 'react'
import {
  FaUserCircle,
  FaLock,
  FaQuestionCircle,
  FaBell,
  FaPalette,
  FaGlobe,
  FaShieldAlt,
  FaCog,
} from 'react-icons/fa'
import ChangePassword from '../components/settings/ChangePassword'
import Profile from '../components/settings/Profile'
import HelpAndSupport from '../components/settings/HelpAndSupport'
import Security from '../components/settings/Security'

const Settings = () => {
  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <FaUserCircle />,
      component: <Profile />,
    },
    {
      id: 'security',
      label: 'Security',
      icon: <FaLock />,
      component: <Security />,
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <FaQuestionCircle />,
      component: <HelpAndSupport />,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className='min-h-dvh w-full bg-gray-50 dark:bg-gray-900'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <div className='mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
        <div className='max-w-5xl mx-auto px-4 py-3'>
          <div className='flex flex-wrap justify-center items-center gap-3'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#1C6BA0] text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className='text-lg'>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-5xl mx-auto'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
          <div className='p-6'>
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Settings
