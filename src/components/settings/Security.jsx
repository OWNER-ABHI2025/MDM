import React from 'react'
import Exclamation from '../../assets/Exclamation.png'
import { FaLock, FaShieldAlt } from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'

const Security = () => {
  return (
    <div className='max-w-3xl mx-auto p-4 sm:p-0'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <MdSecurity className='text-[#1C6BA0] text-xl sm:text-2xl' />
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-white'>
            Security Settings
          </h2>
        </div>

        <div className='bg-orange-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6'>
          <div className='flex flex-col items-center gap-6'>
            <div className='w-20 sm:w-24 h-20 sm:h-24 flex-shrink-0'>
              <img
                src={Exclamation}
                alt='Caution'
                className='w-full h-full object-contain'
              />
            </div>

            <div className='flex-1 text-center w-full'>
              <h3 className='text-base sm:text-lg font-semibold text-orange-700 dark:text-orange-400 mb-3 flex items-center justify-center gap-2'>
                <FaShieldAlt className='text-lg sm:text-xl' />
                Password Change Restricted
              </h3>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto'>
                For security reasons, password changes are managed by the
                administrator. Please contact your admin for any
                password-related requests.
              </p>

              <div className='bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm max-w-md mx-auto'>
                <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='flex items-center gap-2 whitespace-nowrap'>
                    <FaLock className='text-[#1C6BA0] flex-shrink-0' />
                    <span>Contact Admin:</span>
                  </div>
                  <a
                    href='mailto:admin@admin.com'
                    className='text-[#1C6BA0] hover:underline break-all sm:break-normal'
                  >
                    admin@admin.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security
