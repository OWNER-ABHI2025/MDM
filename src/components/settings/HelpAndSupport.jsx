import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import { submitHelp } from '../../apis/helpSupport'

const HelpAndSupport = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !company || !position || !message) {
      toast.error('Please fill in all fields')
      return
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      company,
      position,
      message,
    }

    try {
      await submitHelp(payload) 
      toast.success('Help request submitted successfully')
      setFirstName('')
      setLastName('')
      setEmail('')
      setCompany('')
      setPosition('')
      setMessage('')
    } catch {
      toast.error('Failed to submit help request')
    }
  }

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div className='md:w-2/5'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
          Get in touch
        </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Use our contact form for all information requests or contact us
          directly using the contact information below. All information is
          treated with complete confidentiality and in accordance with our data
          protection statement.
        </p>

        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaEnvelope className='text-[#1C6BA0] w-5 h-5' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Email</p>
              <p className='text-[#1C6BA0] font-medium'>Cybertrics@Gmail.com</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaPhone className='text-[#1C6BA0] w-5 h-5' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Phone</p>
              <p className='text-[#1C6BA0] font-medium'>+1 (234) 567-890</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='p-2 bg-[#1C6BA0]/10 rounded-lg'>
              <FaMapMarkerAlt className='text-[#1C6BA0] w-5 h-5' />
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Location
              </p>
              <p className='text-gray-700 dark:text-gray-300'>New York, USA</p>
            </div>
          </div>
        </div>
      </div>

      <div className='md:w-3/5'>
        <form 
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <div className='grid grid-cols-2 gap-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaUser className='text-gray-400' />
              </div>
              <input
                type='text'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder='First name'
                className='w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none'
              />
            </div>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaUser className='text-gray-400' />
              </div>
              <input
                type='text'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder='Last name'
                className='w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none'
              />
            </div>
          </div>

          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaEnvelope className='text-gray-400' />
            </div>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email Address'
              className='w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaBuilding className='text-gray-400' />
              </div>
              <input
                type='text'
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder='Company'
                className='w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none'
              />
            </div>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaBriefcase className='text-gray-400' />
              </div>
              <input
                type='text'
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder='Position'
                className='w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none'
              />
            </div>
          </div>

          <textarea
            placeholder='Message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows='4'
            className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none resize-none'
          ></textarea>

          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1C6BA0] text-white rounded-lg hover:bg-[#155785] transition-colors duration-200'
          >
            <span>Send Message</span>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  )
}
export default HelpAndSupport
