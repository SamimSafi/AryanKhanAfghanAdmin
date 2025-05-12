// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';

import { baselightTheme } from "./theme/DefaultColors";
import { RouterProvider } from 'react-router';
import router from "./routes/Router.js"
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';

function App() {
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </Suspense>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App