import { useNotification } from '../../contexts/NotifcationContext'
import 'react-toastify/dist/ReactToastify.css';

const Button = () => {
  const {message} = useNotification()

  return (
    <div className='w-full sm:w-96'>
      <button
        type='submit'
        className={`py-4 w-full tracking-wide font-semibold bg-[#0D2C49] text-gray-100 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
          message.trim()
            ? 'hover:bg-[#283c6c] active:scale-95'
            : 'opacity-70 cursor-not-allowed'
        }`}
      >
        Send Notification
      </button>
    </div>
  )
}

export default Button
