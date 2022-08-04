import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../stores/userReducer"
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert, Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { API_URL, USER_URL } from "../env";



function Register () {

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

    const registerNewUser =  async () => {
        try {
            const fetchedInfo = await fetch(`${API_URL}/${USER_URL}/new`, {
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
            <Card sx={{backgroundColor: theme.palette.primary}}>
                <CardContent sx={{padding: '50px'}}>
                <Typography sx={{
                    
                }} variant="h4">
                        Register
                      </Typography>
                    <TextField sx={{
                        bgcolor: 'white',
                        mb: theme.inputMargins,
                        mt: theme.inputMargins
                    }} fullWidth variant="outlined" label="name" onChange={updateStoredInfo} name='name'/>
                    <TextField sx={{
                        bgcolor: 'white',
                        mb: theme.inputMargins,
                        mt: theme.inputMargins
                    }} fullWidth label="email" onChange={updateStoredInfo} name='email' />
                    <TextField sx={{
                        bgcolor: 'white',
                        mb: theme.inputMargins,
                        mt: theme.inputMargins
                    }} fullWidth label="password" type='password' onChange={updateStoredInfo} name='password'/>
                    <Button sx={{
                        bgcolor: theme.palette.secondary,
                        m: theme.buttonMargins
                    }} variant="contained" className="submitButton" onClick={registerNewUser}>Submit</Button>
                    {storedInfo.errorMessage ? <Alert severity="error">{storedInfo.message}</Alert> : null}
                </CardContent>
            </Card>
            
        </Box>
    )
}

export default Register