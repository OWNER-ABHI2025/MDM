import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-md 
          sm:max-w-lg md:max-w-xl transform transition-all duration-300 scale-100
          shadow-xl border border-gray-100 dark:border-gray-700"
      >
        <div className="absolute right-4 top-4 z-10">
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 
              dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors duration-200 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-[#1C6BA0] dark:focus:ring-offset-gray-800"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[90vh] overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
};

