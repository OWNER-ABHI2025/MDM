import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.querySelector('.not-found-container').classList.add('fade-in')
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='not-found-container opacity-0 text-center px-4'>
      <div className="flex justify-center items-center mb-6">
          <img 
            src={AliBinAli} 
            alt="Ali Bin Ali Logo" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain animate-pulse"
          />
        </div>

        <div className='text-8xl md:text-[150px] font-bold text-[#1C6BA0]/20 mb-4 animate-bounce'>
          404
        </div>

        <h1 className='text-2xl md:text-4xl font-bold text-[#1C6BA0] mb-4'>
          Oops! Page Not Found
        </h1>
        <p className='text-gray-600 mb-8 text-lg'>
          The page you're looking for seems to have vanished into thin air.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className='bg-[#1C6BA0] hover:bg-[#1C6BA0]/80 text-white font-bold 
                   py-3 px-8 rounded-lg transition-all duration-300 
                   transform hover:scale-105 hover:shadow-lg 
                   focus:outline-none focus:ring-2 focus:ring-[#1C6BA0]/50'
        >
          Return Home
        </button>
      </div>
    </div>
  )
}

export default NotFound