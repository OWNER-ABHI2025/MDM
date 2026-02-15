import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ 
  size = 40, 
  color = "primary", 
  fullScreen = false,
  className = "" 
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CircularProgress 
          size={size} 
          color={color}
          className={className}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <CircularProgress 
        size={size} 
        color={color}
        className={className}
      />
    </div>
  );
};

// Optional: Create different variants of the loader
export const ButtonLoader = () => (
  <CircularProgress size={20} color="inherit" />
);

export const PageLoader = () => (
  <Loader fullScreen />
);

export const ContentLoader = () => (
  <div className="w-full h-[200px] flex items-center justify-center">
    <Loader />
  </div>
);

export default Loader;
