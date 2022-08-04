import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { login } from "../stores/userReducer";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert, Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { API_URL, USER_URL } from "../env";


function Login () {
    const [storedInfo, setStoredInfo] = useState({})
    const theme = useSelector((state) => state.theme).theme
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateStoredInfo = (e) => {
        setStoredInfo({
            ...storedInfo,
            [e.target.name]: e.target.value
        })
    }

    const loginFunction = async () => {

        try {
            const fetchedInfo = await fetch(`${API_URL}/${USER_URL}/login`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: storedInfo.email,
                password: storedInfo.password
            })
        })
        const userInfo = await fetchedInfo.json()
        if(userInfo.success) {
            dispatch(login(userInfo))
            navigate('/')
        } else {
            console.log(`ERROR: ${userInfo.message}` )
            console.log(`data from server below!`)
            console.log(userInfo.currentData)
            setStoredInfo({
                ...storedInfo,
                errorMessage: userInfo.message
            })
        }
        } catch {
            console.log("ERROR: Couldn't fetch information!")
            setStoredInfo({
                ...storedInfo,
                errorMessage: `Server error. Please wait while it starts or gets fixed`
            })
        }

        
    }

    return (
        <Box sx={{margin: '50px'}}>
            <Card className="loginInput" sx={{
                            bgcolor: theme.palette.primary
                        }}>
                <CardContent sx={{padding: '50px'}}>
                <Typography  variant="h4">
                    Login
                </Typography>
                <TextField sx={{
                    bgcolor: 'white',
                    mb: theme.inputMargins,
                    mt: theme.inputMargins
                }} fullWidth label="username" onChange={updateStoredInfo} name='name' />
                <TextField sx={{
                    bgcolor: 'white',
                    mb: theme.inputMargins,
                    mt: theme.inputMargins
                }} fullWidth label="password" type='password' onChange={updateStoredInfo} name='password'/>
                <Button sx={{
                            bgcolor: theme.palette.secondary
                        }} variant="contained" className="submitButton" onClick={loginFunction}>
                    Login
                </Button>
                {storedInfo.errorMessage ? <Alert severity="error">{storedInfo.errorMessage}</Alert> : null}

                </CardContent>
            </Card>
            
            
        </Box>
    )
}

export default Login;