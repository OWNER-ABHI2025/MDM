import React, { useState } from 'react'
import { VscEye } from 'react-icons/vsc'
import { PiEyeClosed } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { FaLock, FaLockOpen, FaUnlock } from 'react-icons/fa'

const ADMIN_ID = 'admin'
const ADMIN_PASS = 'admin'

const Login = () => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [visibility, setVisibility] = useState(false)

  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()
    if (user === ADMIN_ID && pass === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true')
      navigate('/dashboard')
    } else {
      setError('Invalid admin credentials')
    }
  }

  return (
    <div className='relative flex justify-center items-center min-h-dvh w-full overflow-hidden bg-gradient-to-b from-[#1C6BA0]/20 via-white to-[#1C6BA0]/10 text-gray-900'>
      <div className='absolute inset-0 w-full h-full'>
        <div className='absolute -top-4 -left-4 text-[#1C6BA0]/10 transform rotate-45'>
          <FaLock className='w-24 h-24' />
        </div>
        <div className='absolute top-12 right-20 text-[#1C6BA0]/5 transform -rotate-12'>
          <FaLockOpen className='w-16 h-16' />
        </div>
        <div className='absolute -bottom-4 -right-4 text-[#1C6BA0]/10 transform -rotate-45'>
          <FaUnlock className='w-24 h-24' />
        </div>
        <div className='absolute bottom-20 left-12 text-[#1C6BA0]/5 transform rotate-90'>
          <FaLock className='w-16 h-16' />
        </div>
        <div className='absolute top-1/4 right-1/4 text-[#1C6BA0]/5 transform rotate-12'>
          <FaUnlock className='w-20 h-20' />
        </div>
        <div className='absolute bottom-1/3 left-1/4 text-[#1C6BA0]/5 transform -rotate-45'>
          <FaLockOpen className='w-12 h-12' />
        </div>
        <div className='absolute top-1/3 left-1/4 text-[#1C6BA0]/5 transform rotate-180'>
          <FaLock className='w-16 h-16' />
        </div>
        <div className='absolute bottom-1/4 right-1/3 text-[#1C6BA0]/5 transform rotate-45'>
          <FaLockOpen className='w-14 h-14' />
        </div>
      </div>

      <div className='max-w-xl m-2 bg-white/90 backdrop-blur-sm border border-[#1C6BA0]/20 shadow-lg rounded-2xl flex justify-center w-full transition-all duration-300 hover:shadow-xl relative z-10'>
        <div className='flex flex-col items-center justify-center p-6 sm:p-12 w-full'>
          <h1 className='text-2xl font-bold text-[#1C6BA0] mb-6'>
            Welcome Back!
          </h1>

          <div className='min-w-full space-y-6'>
            <form onSubmit={handleLogin}>
              <div className='transform transition-all duration-300 hover:-translate-y-1 mb-4'>
                <label className='block mb-2 ml-1 font-semibold text-[#1C6BA0]'>
                  Username
                </label>
                <input
                  className='w-full px-6 py-4 rounded-lg font-semibold bg-gray-50 border border-[#1C6BA0]/20 placeholder-gray-400 text-md focus:outline-none focus:border-[#1C6BA0] focus:bg-white focus:ring-2 focus:ring-[#1C6BA0]/20 transition-all duration-300'
                  placeholder='Enter username'
                  type='text'
                  value={user}
                  onChange={e => setUser(e.target.value)}
                />
              </div>

              <div className='transform transition-all duration-300 hover:-translate-y-1 mb-4 relative'>
                <label className='block mb-2 ml-1 font-semibold text-[#1C6BA0]'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    className='w-full px-6 py-4 rounded-lg font-semibold bg-gray-50 border border-[#1C6BA0]/20 placeholder-gray-400 text-md focus:outline-none focus:border-[#1C6BA0] focus:bg-white focus:ring-2 focus:ring-[#1C6BA0]/20 transition-all duration-300'
                    placeholder='Enter password'
                    type={visibility ? 'text' : 'password'}
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                  />
                  {/* <div
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-xl cursor-pointer text-[#1C6BA0]/60 hover:text-[#1C6BA0] transition-colors duration-300'
                    onClick={() => setVisibility(!visibility)}
                  >
                    {visibility ? <PiEyeClosed /> : <VscEye />}
                  </div> */}
                </div>
              </div>

              <button
                type='submit'
                className='relative my-6 tracking-wide font-semibold bg-[#1C6BA0] text-white w-full py-4 rounded-lg hover:bg-[#1C6BA0]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:ring-4 focus:ring-[#1C6BA0]/20 focus:outline-none active:scale-95 shadow-md hover:shadow-lg overflow-hidden group'
              >
                <span className='relative z-10'>Login</span>
                <div className='absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500'></div>
                <svg
                  className='w-5 h-5 ml-2 relative z-10'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </button>
            </form>
          </div>

          {error && (
            <div className='mt-4 text-red-500 text-sm font-medium'>
              {error}
            </div>
          )}

          <p className='text-sm text-[#1C6BA0] hover:text-[#1C6BA0]/80 transition-colors duration-300 cursor-pointer font-medium'>
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
