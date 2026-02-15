const LoadingPage = () => {
  return (
    <div className='z-50 flex items-center justify-center h-screen bg-gray-800'>
      <div className='text-center'>
        <div className='text-6xl font-bold text-white animate-bounce'>
          S-N-S
        </div>

        <p className='mt-4 text-sm font-medium text-gray-400'>
          Checking your credentials...
        </p>
      </div>
    </div>
  )
}

export default LoadingPage
