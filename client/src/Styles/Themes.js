import { createTheme } from "@mui/system"


export const lightTheme = {
  inputMargins: '10px',
  buttonMargins: '10px',
  palette: {
    primary: 'lightblue',
    secondary: '#1976d2',
    tertiary: '#1565c0',
    alert: 'red'
  },
  backgroundColor: {
    primary: {light: 'antiquewhite', main: '#1976d2', dark: '#1565c0'}
  }
}

export const darkTheme = {
  palette: {
    primary: {light: '#42a5f5', main: '#1976d2', dark: '#1565c0'},
  },
  backgroundColor: {
    primary: {light: 'antiquewhite', main: '#1976d2', dark: '#1565c0'}
  }
}