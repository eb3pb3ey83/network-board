import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: false;
    xl: false;
  }
}

// Create a theme instance.
const customTheme = createTheme({
  typography: {
    fontFamily: ['Public Sans', 'Noto Sans TC', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1440,
    },
  },
});

export default customTheme;
