import { Link } from 'react-router';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  
  return (
    <PageContainer title="Login" description="this is Login page" sx={{
   
  }}
      >
   <Box
      sx={{
        position: 'relative',
        minHeight: '100vh', // Full viewport height
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)' // Light mode gradient
              : 'radial-gradient(#2c3e50, #34495e, #2e4053)', // Dark mode gradient
          backgroundImage: `url('/src/assets/images/backgrounds/images.avif')`, // Your image path
          backgroundSize: '100% 100%', // Stretch to fit full page
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // No repeating
          opacity: (theme) => (theme.palette.mode === 'light' ? 0.3 : 0.2), // Slightly lower opacity in dark mode
          animation: 'gradient 15s ease infinite', // Gradient animation
          zIndex: 0, // Behind content
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{
              p: 4,
              zIndex: 1,
              width: '100%',
              maxWidth: '500px',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.7)' // Semi-transparent white for light mode
                  : 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark for dark mode
              backdropFilter: 'blur(8px)', // Frosted glass effect
              border: (theme) =>
                theme.palette.mode === 'light'
                  ? '1px solid rgba(255, 255, 255, 0.2)' // Light mode border
                  : '1px solid rgba(255, 255, 255, 0.1)', // Dark mode border
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <AuthLogin
              subtext={
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color={(theme) =>
                    theme.palette.mode === 'light' ? 'textSecondary' : 'textPrimary'
                  } // Adjust text color for contrast
                  mb={1}
                >
                  Login Here
                </Typography>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
    </PageContainer>
  );
};

export default Login2;
