import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { login } from "../stores/userReducer";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert, Box, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { API_URL, POST_URL } from "../env";


const NewPostMenu = () => {

    const [storedInfo, setStoredInfo] = useState({})
    const { username, isAuthenticated } = useSelector((state) => state.user)
    const theme = useSelector((state) => state.theme).theme
    const navigate = useNavigate()

    const updateStoredInfo = (e) => {
        setStoredInfo({
            ...storedInfo,
            [e.target.name]: e.target.value
        })
    }

    const saveNewPost = async () => {
        try {
            const response = await fetch(`${API_URL}/${POST_URL}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({
                    name: storedInfo.name,
                    posterName: username,
                    content: storedInfo.content,
                })
            })
            navigate('/')
        } catch {
            setStoredInfo({
                ...storedInfo,
                errorMessage: 'There was an error sending the post'
            })
        }
    }

    return (
        <Box sx={{margin: '50px'}}>
            <Card className="loginInput" sx={{
                            bgcolor: theme.palette.primary
                        }}>
                <CardContent sx={{padding: '50px'}}>
                <Typography variant="h4">
                    New Post
                </Typography>
                <TextField sx={{
                    bgcolor: 'white',
                    mb: theme.inputMargins,
                    mt: theme.inputMargins
                }} fullWidth label="Post Title" onChange={updateStoredInfo} name='name' />
                <TextField sx={{
                    bgcolor: 'white',
                    mb: theme.inputMargins,
                    mt: theme.inputMargins
                }} multiline minRows={20} fullWidth label="Content" onChange={updateStoredInfo} name='content'/>
                <Button sx={{
                            bgcolor: theme.palette.secondary
                        }} variant="contained" className="submitButton" onClick={saveNewPost}>
                    Post
                </Button>
                {storedInfo.errorMessage ? <Alert severity="error">{storedInfo.errorMessage}</Alert> : null}

                </CardContent>
            </Card>
            
            
        </Box>
    )
}

export default NewPostMenu