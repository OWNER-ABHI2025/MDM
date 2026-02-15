import {
  FaUser,
  FaEdit,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaFileInvoice,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa'

const AdminPortal = () => {
  return (
    <div className='w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 sm:px-6 md:px-8 pt-4 md:pt-8 border border-gray-200'>   
      <div className='w-full my-4 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800'>
        <div className='w-full py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200'>
          <h1 className='text-xl md:text-2xl font-bold mb-2 md:mb-0'>
            Customer Search Result
          </h1>
          <div className='flex items-center'>
            <button className='flex items-center gap-2 text-blue-600 hover:text-blue-700'>
              <FaArrowLeft />
              <span className='text-sm md:text-base'>Go Back to Search</span>
            </button>
          </div>
        </div>

        <div className='p-4 md:p-6'>
          <div className='flex flex-col space-y-6'>
            {/* Profile Section */}
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Left Column - Profile */}
              <div className='w-full md:w-[250px] lg:h-[248px] border border-gray-200 rounded-lg'>
                <div className='flex flex-col items-center justify-center p-4'>
                  <div className='relative'>
                    <FaUser className='w-16 h-16 text-gray-600 bg-gray-200 rounded-full p-3' />
                    <button className='absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white'>
                      <FaEdit className='w-3 h-3' />
                    </button>
                  </div>
                  <div className='mt-4 text-center'>
                    <h2 className='font-semibold text-lg'>John Doe</h2>
                    <p className='text-sm'>User ID: #123456</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='flex flex-col space-y-6 flex-1'>
                {/* Account Details */}
                <div className='border border-gray-200 rounded-lg'>
                  <div className='p-4 border-b border-gray-200'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                      <div className='flex items-center gap-2'>
                        <FaUser className='text-gray-600' />
                        <h2 className='font-semibold text-lg'>
                          Account Details
                        </h2>
                      </div>
                      <button className='flex items-center gap-2 text-blue-600 hover:text-blue-700'>
                        <FaEdit />
                        <span>Edit Information</span>
                      </button>
                    </div>
                  </div>
                  <div className='p-4 md:p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
                      <div className='flex items-start gap-3'>
                        <FaEnvelope className='mt-1 text-gray-600' />
                        <div>
                          <p className='text-sm text-gray-600'>
                            Mailing Address
                          </p>
                          <p className='text-sm font-medium'>
                            123 Main Street, Apt 4B
                          </p>
                          <p className='text-sm font-medium'>
                            New York, NY 10001
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <FaHome className='mt-1 text-gray-600' />
                        <div>
                          <p className='text-sm text-gray-600'>
                            Home/Office Number
                          </p>
                          <p className='text-sm font-medium'>
                            +1 (212) 555-0123
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <FaPhone className='mt-1 text-gray-600' />
                        <div>
                          <p className='text-sm text-gray-600'>Phone Number</p>
                          <p className='text-sm font-medium'>
                            +1 (917) 555-0123
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linked Accounts */}
                <div className='border border-gray-200 rounded-lg'>
                  <div className='p-4 border-b border-gray-200'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                          <FaUser className='text-gray-600' />
                          <h2 className='font-semibold text-lg'>
                            Linked Accounts
                          </h2>
                        </div>
                        <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                          10 Accounts
                        </span>
                      </div>
                      <div className='flex flex-col md:flex-row gap-2 mt-2 md:mt-0'>
                        <button className='text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-600 rounded'>
                          Link Account
                        </button>
                        <button className='text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded'>
                          Unlink Account
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                      <thead className=''>
                        <tr>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Account Number
                          </th>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Service Address
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {[
                          {
                            accountNumber: '1234-5678-9012',
                            address: '123 Main St, New York, NY 10001',
                          },
                          {
                            accountNumber: '2345-6789-0123',
                            address: '456 Park Ave, New York, NY 10002',
                          },
                          
                        ].map((item, index) => (
                          <tr key={index} className='hover:bg-gray-50'>
                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>
                              {item.accountNumber}
                            </td>
                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>
                              {item.address}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Invoice Cloud Status */}
                <div className='border border-gray-200 rounded-lg'>
                  <div className='p-4 flex flex-col md:flex-row justify-between items-center'>
                    <div className='flex items-center gap-4 mb-2 md:mb-0'>
                      <div className='flex items-center gap-2'>
                        <FaFileInvoice className='text-gray-600' />
                        <h2 className='font-semibold text-lg'>
                          Invoice Cloud Status
                        </h2>
                      </div>
                      <span className='flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                        ✓ Correct
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <button className='text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded'>
                        Unregister
                      </button>
                      <button className='text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-600 rounded'>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Email Verification */}
                <div className='border border-gray-200 rounded-lg'>
                  <div className='p-4 border-b border-gray-200'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                      <div className='flex items-center gap-2'>
                        <FaEnvelope className='text-gray-600' />
                        <h2 className='font-semibold text-lg'>
                          Email Verification
                        </h2>
                      </div>
                      <button className='text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-600 rounded mt-2 md:mt-0'>
                        Update Mail
                      </button>
                    </div>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                      <thead>
                        <tr>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Platform
                          </th>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Email
                          </th>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            platform: 'Invoice Cloud',
                            email: 'john.doe@example.com',
                            status: 'correct',
                          },
                          {
                            platform: 'Customer Portal',
                            email: 'johndoe@example.com',
                            status: 'mismatch',
                          },
                          
                        ].map((item, index) => (
                          <tr key={index} className='mb-2'>
                            <td className='px-4 py-2 text-sm text-gray-500 border-b-2 border-white'>
                              {item.platform}
                            </td>
                            <td className='px-4 py-2 text-sm text-gray-500 border-b-2 border-white'>
                              {item.email}
                            </td>
                            <td className='px-4 py-2 border-b-2 border-white'>
                              {item.status === 'correct' ? (
                                <span className='inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full'>
                                  <FaCheckCircle className='text-green-600' />{' '}
                                  Correct
                                </span>
                              ) : (
                                <span className='inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full'>
                                  <FaTimesCircle className='text-red-600' />{' '}
                                  Mismatch
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPortal
