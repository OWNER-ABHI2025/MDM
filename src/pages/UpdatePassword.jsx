import { useEffect, useState } from 'react'
import { VscEye } from 'react-icons/vsc'
import { PiEyeClosed } from 'react-icons/pi'
import { updatePassword } from '../apis/authAPI'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [newVisibility, setNewVisibility] = useState(false)
  const [passwordWarning, setPasswordWarning] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handlePasswordChange = async () => {
    const response = await updatePassword(newPassword)
    if (response.status === 200) {
      toast.success('Password updated successfully')
      navigate('/dashboard')
    } else {
      toast.error('Password update failed')
    }
  }

  const validatePassword = password => {
    const lowercase = /[a-z]/.test(password)
    const uppercase = /[A-Z]/.test(password)
    const number = /\d/.test(password)
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < 8) {
      return 'Password must be at least 8 characters long.'
    }
    if (!lowercase || !uppercase || !number || !specialChar) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    }
    return ''
  }

  useEffect(() => {
    const warningMessage = validatePassword(newPassword)
    setPasswordWarning(warningMessage)

    warningMessage === '' ? setDisabled(false) : setDisabled(true)
  }, [newPassword])

  return (
    <div className='flex justify-center items-center min-h-dvh w-full bg-slate-100 text-gray-900 '>
      <div className='bg-slate-50 shadow-lg rounded-lg p-6 py-12 w-full max-w-lg mx-2'>
        <h2 className='text-2xl text-[#1C6BA0] font-bold mb-2 px-4 text-center'>
          Update Password
        </h2>
        <div className='min-w-full flex flex-col items-center justify-center sm:px-10 mt-6'>
          <div className='my-4'>
            <img src={logo} alt='Logo' />
          </div>
          <div className='my-3 relative w-full duration-300 hover:-translate-y-1'>
            <label className='block mb-2 ml-3 font-semibold text-[#1C6BA0]'>
              New Password
            </label>
            <input
              className='w-full px-6 py-4 rounded-full font-semibold bg-gray-50 border border-gray-200 bord placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white'
              placeholder='Enter password'
              type={newVisibility ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <div
              className='absolute right-4 text-xl top-1/2 translate-y-1/3'
              onClick={() => setNewVisibility(!newVisibility)}
            >
              {newVisibility ? <PiEyeClosed /> : <VscEye />}
            </div>
          </div>
          <div className='my-3  px-6 w-full flex items-center justify-center text-justify'>
            {newPassword.length !== 0 && passwordWarning && (
              <p className='text-red-500 text-md mt-2'>{passwordWarning}</p>
            )}
          </div>
          <button
            onClick={handlePasswordChange}
            disabled={disabled}
            className='mt-6 mb-3 tracking-wide font-semibold rounded-full bg-blue-500 text-gray-100 w-full max-w-80 py-3 hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none active:scale-95 disabled:opacity-85 disabled:cursor-not-allowed disabled:active:scale-100'
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword
