import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Root from './pages/root';
import { Loader } from './components/Loader';
import Dashboard from './components/Dashboard';
// import EngineerLayout from './pages/engineerLayout';
const initialSite = sessionStorage.getItem('site');

function App() {
  const [site, setSite] = useState(initialSite ? initialSite : 'www');
  useEffect(() => {
    window.addEventListener(
      'message',
      function (event) {
        if (typeof event.data === 'string') {
          setSite(event.data);
          window.sessionStorage.setItem('site', event.data);
        }
      },
      false,
    );
    window.sessionStorage.setItem('site', 'www');
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <EngineerLayout /> */}
        <CssBaseline />

        <React.Suspense
          fallback={
            <Box
              sx={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                left: 0,
                top: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader />
            </Box>
          }
        >
          <Router>
            <Routes>
              <Route path="/dashboard" element={<Root site={site} />}>
                <Route path="index/:role" element={<Dashboard />} />
              </Route>
            </Routes>
          </Router>
        </React.Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
