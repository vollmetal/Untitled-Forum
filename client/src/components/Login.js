import { useState } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { login } from "../stores/userReducer";



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
        <div className="loginMenu">
            <h1>Login</h1>
            <div className="loginInput">
                <div className="fieldInput">
                    <label>Email: </label>
                    <input onChange={updateStoredInfo} type='text' name='email' placeholder='test@test.com'/>
                </div>
                <div className="fieldInput">
                    <label>Password: </label>
                    <input onChange={updateStoredInfo} type='password' name='password' placeholder='password'/>
                </div>
            </div>
            <button className="submitButton" onClick={loginFunction}>Login</button>
            {storedInfo.errorMessage ? <label className="failMessage">{storedInfo.errorMessage}</label> : null}
        </div>
    )
}

export default Login;