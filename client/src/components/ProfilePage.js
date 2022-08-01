import { useEffect, useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Skeleton, TextField, Typography } from "@mui/material";
import * as lightStyles from "../Styles/lightStyle";



function ProfilePage() {
    const [profileInfo, setprofileInfo] = useState({})
    const [retrievingInfo, setRetrievingInfo] = useState(false)

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
            const fetchedInfo = await fetch('http://localhost:4200/user/find', {
                method: 'GET',
                headers: {
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
                }
            })
            const userInfo = await fetchedInfo.json()
            console.log(userInfo)
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
            console.log(userInfo)
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
            {!retrievingInfo ? <Card sx={{backgroundColor: lightStyles.CARDCOLOR, }}>
                <CardContent sx={{padding: '50px', flexDirection: 'column', display: 'flex'}}>
                    <Typography sx={lightStyles.CardHeaderText} variant="h4">
                        Profile Information
                      </Typography>
                    <TextField sx={lightStyles.MainTextInput} label="Profile Picture" onChange={updateStoredInfo} type='text' name='profileURL' value={profileInfo.profileURL} />
                    <TextField sx={lightStyles.MainTextInput} label="Username" onChange={updateStoredInfo} type='text' name='name' value={profileInfo.name} />
                    <TextField sx={lightStyles.MainTextInput} label="Email" onChange={updateStoredInfo} type='text' name='email' value={profileInfo.email} />
                    <TextField sx={lightStyles.MainTextInput} label="About Me" onChange={updateStoredInfo} type='text' name='aboutMe' value={profileInfo.aboutMe} />
                    <Button variant="contained" onClick={saveUpdatedInfo}>Update Info</Button>

                </CardContent>
            </Card> : <Skeleton variant="rectangular" animation="wave" />}
        </Box>
    )

}

export default ProfilePage