// src/components/ImageDisplay.js
import { useState } from 'react';
import {
  Typography,
  styled,
  Modal,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { baseURL } from '../api/baseURL';

// Define styled img component for consistent styling
const StyledImage = styled('img')({
  maxWidth: '50px',
  maxHeight: '50px',
  objectFit: 'cover',
  borderRadius: '4px',
  cursor: 'pointer', // Indicate the image is clickable
});

// Styled img for the modal (larger image)
const ModalImage = styled('img')({
  maxWidth: '90%',
  maxHeight: '80vh',
  objectFit: 'contain',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
});

// Styled modal container
const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: theme.spacing(2),
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: '95vw',
  maxHeight: '95vh',
  overflow: 'auto',
}));

// Close button styling
const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[800],
}));

const ImageDisplay = ({
  path, // Image path (e.g., Services.photoPath)
  alt = 'Image', // Alt text for accessibility
  fallbackText = 'No image', // Text to display if no image
  className, // Optional className for additional styling
  ...imgProps // Additional props to pass to the img element
}) => {
  const [hasError, setHasError] = useState(false);
  const [open, setOpen] = useState(false);

  // Construct full image URL
  const fullPath = path ? `${baseURL}${path.replace(/\\/g, '/')}` : null;

  const handleError = (e) => {
    console.error('Image load error:', path);
    setHasError(true);
    e.target.style.display = 'none';
  };

  const handleImageClick = () => {
    if (fullPath && !hasError) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {fullPath && !hasError ? (
        <StyledImage
          src={fullPath}
          alt={alt}
          onError={handleError}
          onClick={handleImageClick}
          className={className}
          {...imgProps}
        />
      ) : (
        <Typography variant="caption">{fallbackText}</Typography>
      )}

      {/* Modal for enlarged image view */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-viewer-modal"
        aria-describedby="View enlarged image"
        sx={{ backdropFilter: 'blur(5px)' }} // Modern blur effect on backdrop
      >
        <ModalContainer>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <ModalImage
            src={fullPath}
            alt={alt}
            onError={handleError}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ImageDisplay;