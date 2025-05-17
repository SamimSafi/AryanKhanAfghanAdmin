// src/components/ImageDisplay.js
import { useState } from 'react';
import { Typography, styled } from '@mui/material';
import { baseURL } from '../api/baseURL';

// Define styled img component for consistent styling
const StyledImage = styled('img')({
  maxWidth: '50px',
  maxHeight: '50px',
  objectFit: 'cover',
  borderRadius: '4px',
});


const ImageDisplay = ({
  path, // Image path (e.g., Services.photoPath)
  alt = 'Image', // Alt text for accessibility
  fallbackText = 'No image', // Text to display if no image
  className, // Optional className for additional styling
  ...imgProps // Additional props to pass to the img element
}) => {
  const [hasError, setHasError] = useState(false);

// Base URL for your API (adjust as needed)
  // Construct full image URL
  const fullPath = path ? `${baseURL}${path.replace(/\\/g, '/')}` : null;

  const handleError = (e) => {
    console.error('Image load error:', path);
    setHasError(true);
    e.target.style.display = 'none';
  };

  return fullPath && !hasError ? (
    <StyledImage
      src={fullPath}
      alt={alt}
      onError={handleError}
      className={className}
      {...imgProps}
    />
  ) : (
    <Typography variant="caption">{fallbackText}</Typography>
  );
};

export default ImageDisplay;