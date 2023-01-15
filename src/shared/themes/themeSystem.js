import { createTheme, responsiveFontSizes } from '@mui/material';

let themeSystem = createTheme({
  palette: {
    primary: {
      main: "#171717",
      dark: "#444444",
      light: "#787A91",
      contrastText: "#fff"
    },
    secondary: {
      main: "#5C3D2E",
      dark: "#B85C38",
      light: "#E0C097",
      contrastText: "#000"
    },
    background: {
      paper: "#fff"
    }
  },
});

themeSystem = responsiveFontSizes(themeSystem);

export default themeSystem;

