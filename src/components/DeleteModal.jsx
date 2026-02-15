const DeleteModal = ({ isOpen, onClose, onDelete, itemName, isDeleting }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div
        className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
        onClick={onClose}
      />
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <div className='relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
          <div className='bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10'>
                <svg
                  className='h-6 w-6 text-red-600 dark:text-red-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                <h3 className='text-lg font-semibold leading-6 text-gray-900 dark:text-white'>
                  Delete Notification
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete this notification? This
                    action cannot be undone.
                  </p>
                  {itemName && (
                    <p className='mt-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                      "{itemName}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
            {isDeleting ? (
              <div className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 sm:ml-3 sm:w-auto'>
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
              </div>
            ) : (
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
        hover:bg-red-500 
        dark:bg-red-500 dark:hover:bg-red-600 
        sm:ml-3 sm:w-auto 
        transition-colors duration-200'
                onClick={onDelete}
                disabled={isDeleting}
              >
                Delete
              </button>
            )}
            <button
              type='button'
              className='mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm 
      bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50
      dark:bg-gray-600 dark:text-gray-200 dark:ring-gray-500 dark:hover:bg-gray-500
      sm:mt-0 sm:w-auto 
      transition-colors duration-200'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
