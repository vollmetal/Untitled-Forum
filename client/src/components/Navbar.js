import { NavLink, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../stores/userReducer'
import Button from '@mui/material/Button';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

function Navbar (props) {
    const { username, isAuthenticated } = useSelector((state) => state.user)
    const theme = useSelector((state) => state.theme).theme
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutFunction = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <AppBar position='relative' sx={{color: 'black'}}>
            <Toolbar variant='h1' sx={{
                            bgcolor: theme.palette.primary,
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                        }}>
            <Typography >OpenForum</Typography>
                <div><NavLink to="/"><Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant='contained'>Home</Button> </NavLink></div>

            {!isAuthenticated ? <Box >
                        <NavLink to='/register'><Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant='contained'>Register</Button></NavLink>
                        <NavLink to='/login'><Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant='contained'>Login</Button></NavLink>
                    </Box> : <Box>
                        <Typography variant='h5'>{username}</Typography>
                        <NavLink to='/profile'><Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant='contained'> My Profile</Button></NavLink>
                        <Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant="contained" onClick={logoutFunction}>Logout</Button>
                </Box>}
            </Toolbar>
        </AppBar>
        
    )
}

export default Navbar