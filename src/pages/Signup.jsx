import { useState } from 'react'
import { VscEye } from 'react-icons/vsc'
import { PiEyeClosed } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visibility, setVisibility] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    // TODO insert signup api here

    try {
      console.log('sign in successful')
    } catch {
      alert('idk some error')
    }
  }

  return (
    <div className='flex justify-center w-full min-h-dvh text-gray-900 '>
      <div className='max-w-screen-xl m-0 sm:m-10 bg-[#f4f6ff] shadow sm:rounded-lg flex justify-center w-full'>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
        <div className='flex flex-col items-center justify-center lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>
            Welcome to MDM Security
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mx-auto max-w-xs'>
              <div className='my-4'>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  placeholder='First Name'
                  type='text'
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className='my-4'>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  placeholder='Last Name'
                  type='text'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className='my-4'>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  placeholder='Email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='my-4 relative'>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  placeholder='Password'
                  type={visibility ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div
                  className='absolute right-4 text-xl top-1/2 -translate-y-1/2'
                  onClick={() => setVisibility(!visibility)}
                >
                  {visibility ? <PiEyeClosed /> : <VscEye />}
                </div>
              </div>
              <button
                type='submit'
                className='my-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
              >
                Sign up
              </button>
            </div>
            <p>
              Already have an account ?{' '}
              <Link to='/' className='text-blue-500 hover:underline'>
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
