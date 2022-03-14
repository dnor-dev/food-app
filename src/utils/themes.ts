import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['"Manrope"'].join(','),
  },
  palette: {
    primary: {
      main: '#a80707',
    },

    text: {
      primary: '#333',
    },
  },
});

export default theme;
