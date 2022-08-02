import { createTheme } from "@mui/system"


export const lightTheme = createTheme({
  palette: {
    primary: {light: '#42a5f5', main: '#1976d2', dark: '#1565c0'},
  },
  backgroundColor: {
    primary: {light: 'antiquewhite', main: '#1976d2', dark: '#1565c0'}
  }
})

export const BACKGROUNDCOLOR = ''

export const CARDCOLOR = 'lightgray'

export const MAINCOLOR = 'blue'

export const MainButton = {
  marginTop: '10px',
  marginBottom: '10px',
  backgroundColor: lightTheme.palette.primary.main
}

export const HeaderText = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export const CardHeaderText = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  
}

export const MainTextInput = {
  marginTop: '10px',
  marginBottom: '10px',
  backgroundColor: 'white'
}

export const NavBar = {
  display: 'flex',
  justifyContent: 'space-between',
  bgcolor: lightTheme.palette.primary.light
}