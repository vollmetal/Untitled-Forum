import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../stores/userReducer";
import Navbar from "./Navbar";
import { API_URL, USER_URL } from "../env";


function BaseLayout (props) {
    const token = localStorage.getItem('userToken')
    const reduxToken = useSelector((state) => state.token)
    const theme = useSelector((state) => state.theme).theme
    const dispatch = useDispatch()
    useEffect (() => {
        if(token && !reduxToken) {
            const userInfo = loginWithToken()
            
        }
    }, []) 

    const loginWithToken = async () => {
        try {
            const fetchedInfo = await fetch(`${API_URL}/${USER_URL}/find`, {
            method:'GET',
            headers: {
                'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
            }
        })
        const responseUser = await fetchedInfo.json()
        //userInfo += localStorage.getItem('userToken')
        const userInfo = {
            token: localStorage.getItem('userToken'),
            name: responseUser.user.name
        }
        if(responseUser.success) {
            dispatch(login(userInfo))
        } else {
            console.log(`ERROR: ${responseUser.message}` )
            console.log(`data from server below!`)
            console.log(responseUser.currentData)
        }
        } catch {
            console.log("ERROR: Couldn't fetch information!")
        }
    }

    return (
            <Box sx={{backgroundColor: theme.backgroundColor.primary.light}}>
            <Navbar/>
            {props.children}
        </Box>
        
    )
}

export default BaseLayout;