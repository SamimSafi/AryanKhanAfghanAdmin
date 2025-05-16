import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Typography, Paper, IconButton, Grid } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

const FileUpload = ({ control, name, title, isEdit, isSubmitting, handleFileChange }) => {
  const [dragOver, setDragOver] = useState(false);

  return (
    <Grid item lg={12} xs={12} sm={12} md={12}>
      <Controller
        name={name}
        control={control}
        rules={{ required: isEdit ? false : `${title} is required` }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box
            sx={{
              width: '100%', // Take full width of the Grid item
            }}
          >
            <Paper
              elevation={dragOver ? 8 : 2}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                bgcolor: dragOver ? 'action.hover' : 'background.paper',
                transition: 'all 0.3s ease',
                border: error ? '1px solid' : '1px dashed',
                borderColor: error ? 'error.main' : 'grey.400',
                p: value ? 0 : 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: 150, sm: 200 }, // Responsive height
                width: '100%', // Ensure Paper takes full width
                boxSizing: 'border-box', // Prevent padding issues
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files[0]) {
                  handleFileChange(e, onChange);
                }
              }}
            >
              {value ? (
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 150, sm: 200 } }}>
                  <img
                    src={URL.createObjectURL(value)}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain', // Fit entire image without cropping
                      borderRadius: 8,
                      objectPosition: 'center', // Center the image
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'error.main', color: 'white' },
                    }}
                    onClick={() => onChange(null)}
                    disabled={isSubmitting}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%', // Ensure content scales
                  }}
                  component="label"
                >
                  <CloudUpload
                    sx={{
                      fontSize: { xs: 30, sm: 40 },
                      color: error ? 'error.main' : 'primary.main',
                    }}
                  />
                  <Typography
                    variant="body1"
                    color={error ? 'error.main' : 'text.primary'}
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  >
                    Drag & drop or click to upload
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileChange(e, onChange)}
                    disabled={isSubmitting}
                  />
                </Box>
              )}
            </Paper>
            {error && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: 1, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        )}
      />
    </Grid>
  );
};

export default FileUpload;