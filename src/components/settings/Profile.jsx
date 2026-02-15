import React from 'react'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaIdCard,
} from 'react-icons/fa'
import { MdWork } from 'react-icons/md'

const Profile = () => {
  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6'>
        <div className='flex flex-col sm:flex-row items-center gap-6'>
          <div className='relative group'>
            <div className='w-24 h-24 rounded-full overflow-hidden bg-[#1C6BA0]/10 flex items-center justify-center ring-2 ring-offset-2 ring-[#1C6BA0]/20 dark:ring-offset-gray-800 transition-all duration-300 group-hover:ring-[#1C6BA0]/40'>
              <FaUser className='w-12 h-12 text-[#1C6BA0] transform group-hover:scale-110 transition-transform duration-300' />
            </div>
            <button
              className='absolute bottom-0 right-0 bg-[#1C6BA0] text-white p-2 rounded-full shadow-lg hover:bg-[#155785] transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C6BA0]'
              title='Change Profile Picture'
            >
              <FaUser className='w-4 h-4' />
            </button>
          </div>

          <div className='text-center sm:text-left'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
              Admin
            </h2>
            <div className='flex flex-col sm:flex-row items-center gap-3 text-gray-600 dark:text-gray-400'>
              <div className='flex items-center gap-2'>
                <MdWork className='text-[#1C6BA0]' />
                <span>Senior Developer</span>
              </div>
              <div className='hidden sm:block text-gray-300 dark:text-gray-600'>
                •
              </div>
              <div className='flex items-center gap-2'>
                <FaIdCard className='text-[#1C6BA0]' />
                <span>EMP-2024-001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-6'>
          Personal Information
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex items-start gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaEnvelope className='w-5 h-5 text-[#1C6BA0]' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Email</p>
              <p className='text-gray-900 dark:text-white'>
                admin@admin.com
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaPhone className='w-5 h-5 text-[#1C6BA0]' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Phone</p>
              <p className='text-gray-900 dark:text-white'>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaMapMarkerAlt className='w-5 h-5 text-[#1C6BA0]' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Location
              </p>
              <p className='text-gray-900 dark:text-white'>New York, USA</p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaBirthdayCake className='w-5 h-5 text-[#1C6BA0]' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Birthday
              </p>
              <p className='text-gray-900 dark:text-white'>January 15, 1990</p>
            </div>
          </div>
        </div>

        {/* <div className='mt-6 flex justify-end'>
          <button className='flex items-center gap-2 px-4 py-2 bg-[#1C6BA0] text-white rounded-lg hover:bg-[#155785] transition-colors duration-200'>
            <span>Edit Profile</span>
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Profile
