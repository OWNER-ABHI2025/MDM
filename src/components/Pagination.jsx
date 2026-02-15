const Pagination = ({
  currentPage,
  totalPages,
  data,
  indexOfFirstItem,
  indexOfLastItem,
  setCurrentPage,
  getPageNumbers,
}) => {
  return (
    <>
      {data && data.length > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6'>
          {/* Mobile pagination */}
          <div className='flex flex-1 justify-between sm:hidden'>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-[#1C6BA0] dark:text-[#2D8AC8] hover:bg-[#1C6BA0] dark:hover:bg-[#2D8AC8] hover:text-white'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-[#1C6BA0] dark:text-[#2D8AC8] hover:bg-[#1C6BA0] dark:hover:bg-[#2D8AC8] hover:text-white'
              }`}
            >
              Next
            </button>
          </div>

          {/* Desktop pagination */}
          <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                Showing{' '}
                <span className='font-medium'>{indexOfFirstItem + 1} to </span>
                <span className='font-medium'>
                  {Math.min(indexOfLastItem, data.length)} of{' '}
                </span>
                <span className='font-medium'>{data.length} results</span>
              </p>
            </div>

            <div>
              <nav
                className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                aria-label='Pagination'
              >
                {/* Previous button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-[#1C6BA0] dark:text-[#2D8AC8] hover:bg-[#1C6BA0] dark:hover:bg-[#2D8AC8] hover:text-white'
                  }`}
                >
                  <span className='sr-only'>Previous</span>
                  <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((pageNum, idx) => (
                  <button
                    key={idx}
                    onClick={() => pageNum !== '...' && setCurrentPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                      pageNum === currentPage
                        ? 'z-10 bg-[#1C6BA0] dark:bg-[#2D8AC8] text-white'
                        : pageNum === '...'
                        ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default'
                        : 'bg-white dark:bg-gray-800 text-[#1C6BA0] dark:text-[#2D8AC8] hover:bg-[#1C6BA0] dark:hover:bg-[#2D8AC8] hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-[#1C6BA0] dark:text-[#2D8AC8] hover:bg-[#1C6BA0] dark:hover:bg-[#2D8AC8] hover:text-white'
                  }`}
                >
                  <span className='sr-only'>Next</span>
                  <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
