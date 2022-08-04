import { useEffect, useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Skeleton, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, USER_URL } from "../env";



function ProfilePage() {
    const [profileInfo, setprofileInfo] = useState({})
    const [retrievingInfo, setRetrievingInfo] = useState(false)
    const theme = useSelector((state) => state.theme).theme

    useEffect(() => {
        getProfileInfo()
    }, [])

    const updateStoredInfo = (e) => {
        setprofileInfo({
            ...profileInfo,
            [e.target.name]: e.target.value
        })
    }

    const getProfileInfo = async () => {
        setRetrievingInfo(true)
        try {
            const fetchedInfo = await fetch(`${API_URL}/${USER_URL}/find`, {
                method: 'GET',
                headers: {
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
                }
            })
            const userInfo = await fetchedInfo.json()
            if (userInfo.success) {
                setprofileInfo({
                    ...profileInfo,
                    name: userInfo.user.name,
                    email: userInfo.user.email,
                    profileURL: userInfo.user.profileURL,
                    aboutMe: userInfo.user.aboutMe
                })
            } else {
                console.log(`ERROR: ${userInfo.message}`)
                console.log(`data from server below!`)
                console.log(userInfo.currentData)
            }
        } catch {
            console.log("ERROR: Couldn't fetch information!")
        } finally {
            setRetrievingInfo(false)
        }
    }

    const saveUpdatedInfo = async () => {
        try {
            const fetchedInfo = await fetch('http://localhost:4200/user/update', {
                method: 'POST',
                headers: {
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: profileInfo.name,
                    email: profileInfo.email,
                    profileURL: profileInfo.profileURL,
                    aboutMe: profileInfo.aboutMe
                })
            })
            const userInfo = await fetchedInfo.json()
            if (userInfo.success) {
                setprofileInfo({
                    ...profileInfo,
                    name: userInfo.user.name,
                    email: userInfo.user.email,
                    profileURL: userInfo.user.profileURL,
                    aboutMe: userInfo.user.aboutMe
                })
            } else {
                console.log(`ERROR: ${userInfo.message}`)
                console.log(`data from server below!`)
                console.log(userInfo.currentData)
            }
        } catch {
            console.log("ERROR: Couldn't update information!")
        }
    }

    return (
        <Box sx={{margin: '50px'}}>
            {!retrievingInfo ? <Card sx={{backgroundColor: theme.palette.primary, }}>
                <CardContent sx={{padding: '50px', flexDirection: 'column', display: 'flex'}}>
                    <Typography sx={{
                        
                    }} variant="h4">
                        Profile Information
                      </Typography>
                    <TextField sx={{
                        bgcolor: 'white',
                        mb: theme.inputMargins,
                        mt: theme.inputMargins
                    }} label="Username" onChange={updateStoredInfo} type='text' name='name' value={profileInfo.name} />
                    <TextField sx={{
                        bgcolor: 'white',
                        mb: theme.inputMargins,
                        mt: theme.inputMargins
                    }} label="Email" onChange={updateStoredInfo} type='text' name='email' value={profileInfo.email} />
                    <Button variant="contained" sx={{
                        bgColor: theme.palette.secondary,
                        m: theme.buttonMargins
                    }} onClick={saveUpdatedInfo}>Update Info</Button>

                </CardContent>
            </Card> : <Skeleton variant="rectangular" animation="wave" />}
        </Box>
    )

}

export default ProfilePage