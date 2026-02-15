import { RxCross2 } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import PropTypes from 'prop-types';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-[400px] relative animate-fadeIn'>
        <div className='p-4 sm:p-6'>
          <button
            onClick={onClose}
            className='absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors'
          >
            <RxCross2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="mt-2 sm:mt-4 text-center">
            <FiLogOut className="mx-auto text-[#1C6BA0] h-8 w-8 sm:h-12 sm:w-12 mb-3 sm:mb-4" />
            
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Confirm Logout
            </h3>
            
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C6BA0] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-[#1C6BA0] text-white rounded-md hover:bg-[#175785] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C6BA0] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default LogoutModal;
