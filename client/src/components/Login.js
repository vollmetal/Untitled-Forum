import { useState } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { login } from "../stores/userReducer";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert, Box, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import * as lightStyles from "../Styles/lightStyle";


function Login () {
    const [storedInfo, setStoredInfo] = useState({})
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
            const fetchedInfo = await fetch('http://localhost:4200/user/login', {
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
            <Card className="loginInput" sx={{backgroundColor: lightStyles.CARDCOLOR}}>
                <CardContent sx={{padding: '50px'}}>
                <Typography sx={lightStyles.CardHeaderText} variant="h4">
                    Login
                </Typography>
                <TextField sx={lightStyles.MainTextInput} fullWidth label="email" onChange={updateStoredInfo} name='email' />
                <TextField sx={lightStyles.MainTextInput} fullWidth label="password" type='password' onChange={updateStoredInfo} name='password'/>
                <Button sx={lightStyles.MainButton} variant="contained" className="submitButton" onClick={loginFunction}>
                    Login
                </Button>
                {storedInfo.errorMessage ? <Alert severity="error">{storedInfo.errorMessage}</Alert> : null}

                </CardContent>
            </Card>
            
            
        </Box>
    )
}

export default Login;