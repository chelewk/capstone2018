import { createMuiTheme } from 'material-ui/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a50000',
      main: '#800000',
      dark: '#560000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#efc53e',
      main: '#d4af37',
      dark: '#af912d',
      contrastText: '#000000',
    },
  },
});