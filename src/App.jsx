// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { CssBaseline, ThemeProvider } from '@mui/material';

import { baselightTheme } from "./theme/DefaultColors";
import { RouterProvider } from 'react-router';
import router from "./routes/Router.js"
import { ToastContainer } from 'react-toastify';

function App() {
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App