import { useState } from "react"
import { useDispatch } from "react-redux"
import { login, register } from "../stores/userReducer"
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert, Box, Card, CardContent, TextField, Typography } from "@mui/material";
import * as lightStyles from "../Styles/lightStyle";



function Register () {

    const [storedInfo, setStoredInfo] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateStoredInfo = (e) => {
        setStoredInfo({
            ...storedInfo,
            [e.target.name]: e.target.value
        })
    }

    const registerNewUser =  async () => {
        try {
            const fetchedInfo = await fetch('http://localhost:4200/user/new', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    name: storedInfo.name,
                    email: storedInfo.email,
                    password: storedInfo.password,
                    profileURL: "placeholder",
                    aboutMe: "placeholder"
            })
        })
        const userInfo = await fetchedInfo.json()
        if(userInfo.success) {
            loginFunction()
        } else {
            console.log(`ERROR: ${userInfo.message}` )
            console.log(`data from server below!`)
            console.log(userInfo.currentData)
            setStoredInfo({
                ...storedInfo,
                message: userInfo.message
            })
        }
        } catch {
            console.log("ERROR: Couldn't fetch information!")
            setStoredInfo({
                ...storedInfo,
                message: `Server error. Please wait while it starts or gets fixed`
            })
        }
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
                message: userInfo.message
            })
        }
        } catch {
            console.log("ERROR: Couldn't fetch information!")
            setStoredInfo({
                ...storedInfo,
                message: `Server error. Please wait while it starts or gets fixed`
            })
        }

        
    }

    return (
        <Box sx={{margin: '50px'}}>
            <Card sx={{backgroundColor: lightStyles.CARDCOLOR}}>
                <CardContent sx={{padding: '50px'}}>
                <Typography sx={lightStyles.CardHeaderText} variant="h4">
                        Register
                      </Typography>
                    <TextField sx={lightStyles.MainTextInput} fullWidth variant="outlined" label="name" onChange={updateStoredInfo} name='name'/>
                    <TextField sx={lightStyles.MainTextInput} fullWidth label="email" onChange={updateStoredInfo} name='email' />
                    <TextField sx={lightStyles.MainTextInput} fullWidth label="password" type='password' onChange={updateStoredInfo} name='password'/>
                    <Button sx={lightStyles.MainButton} variant="contained" className="submitButton" onClick={registerNewUser}>Submit</Button>
                    {storedInfo.errorMessage ? <Alert severity="error">{storedInfo.message}</Alert> : null}
                </CardContent>
            </Card>
            
        </Box>
    )
}

export default Register