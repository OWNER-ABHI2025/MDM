import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import { FaEye } from 'react-icons/fa';
import { IoMdDownload, IoMdCloseCircle } from 'react-icons/io';


const ImagePreviewModal = ({ isOpen, onClose, imageUrl }) => {

    const handleDownload = async (url, fileName) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        console.error('Download failed:', error);
      }
    };
  
    return (
      <Dialog 
        open={isOpen} 
        onClose={onClose} 
        maxWidth='md' 
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#0D2C49',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            m: 0,
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
            <FaEye />
            <Typography>Screenshot Preview</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => handleDownload(imageUrl, 'screenshot.png')}
              size='small'
              sx={{ 
                color: '#4FA8E0',
                '&:hover': {
                  backgroundColor: 'rgba(79, 168, 224, 0.1)'
                }
              }}
            >
              <IoMdDownload />
            </IconButton>
            <IconButton
              onClick={onClose}
              size='small'
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <IoMdCloseCircle />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 1,
              overflow: 'hidden',
              mt: 1,
              position: 'relative',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <img
              src={imageUrl}
              alt='Screenshot preview'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  export default ImagePreviewModal;