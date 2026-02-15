import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='rounded-lg shadow-lg max-w-md w-full relative sm:ml-64 mx-2 sm:pl-2'>
        <button
          onClick={onClose}
          className='absolute top-7 right-6 text-black font-bold'
        >
          <RxCross2 size={'1.4rem'} className="text-gray-500 dark:text-white"/>
        </button>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;