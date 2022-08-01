import { NavLink, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../stores/userReducer'
import * as React from 'react';
import Button from '@mui/material/Button';
import * as lightStyles from "../Styles/lightStyle";
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

function Navbar (props) {
    const { username, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutFunction = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <AppBar position='relative' sx={{color: 'black'}}>
            <Toolbar variant='h1' sx={lightStyles.NavBar}>
            <Typography sx={lightStyles.HeaderText}>OpenForum</Typography>
                <div><NavLink to="/"><Button sx={lightStyles.MainButton} variant='contained'>Home</Button> </NavLink></div>

            {!isAuthenticated ? <Box >
                        <NavLink to='/register'><Button sx={lightStyles.MainButton} variant='contained'>Register</Button></NavLink>
                        <NavLink to='/login'><Button sx={lightStyles.MainButton} variant='contained'>Login</Button></NavLink>
                    </Box> : <Box>
                        <Typography variant='h5'>{username}</Typography>
                        <NavLink to='/profile'><Button sx={lightStyles.MainButton} variant='contained'> My Profile</Button></NavLink>
                        <Button sx={lightStyles.MainButton} variant="contained" onClick={logoutFunction}>Logout</Button>
                </Box>}
            </Toolbar>
        </AppBar>
        
    )
}

export default Navbar