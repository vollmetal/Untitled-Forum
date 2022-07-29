import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { login } from "../stores/userReducer";
import Navbar from "./Navbar";


function BaseLayout (props) {
    const token = localStorage.getItem('userToken')
    const reduxToken = useSelector((state) => state.token)
    const dispatch = useDispatch()
    useEffect (() => {
        if(token && !reduxToken) {
            const userInfo = loginWithToken()
            
        }
    }, []) 

    const loginWithToken = async () => {
        try {
            const fetchedInfo = await fetch('http://localhost:4200/user/find', {
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
        console.log(userInfo)
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
        <div className="baseLayout">
            <Navbar/>
            {props.children}
        </div>
    )
}

export default BaseLayout;