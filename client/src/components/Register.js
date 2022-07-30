import { useState } from "react"
import { useDispatch } from "react-redux"
import { login, register } from "../stores/userReducer"
import { useNavigate } from "react-router-dom";



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
        <div className="loginMenu">
            <h1>Register Account here!</h1>
            <div className="registerInput">
            <div className="fieldInput">
                    <label>Username: </label>
                    <input onChange={updateStoredInfo} type='text' name='name' placeholder='test'/>
                </div>
                <div className="fieldInput">
                    <label>Email: </label>
                    <input onChange={updateStoredInfo} type='text' name='email' placeholder='test@test.com'/>
                </div>
                <div className="fieldInput">
                    <label>Password: </label>
                    <input onChange={updateStoredInfo} type='password' name='password' placeholder='password'/>
                </div>
            </div>
            <button className="submitButton" onClick={registerNewUser}>Submit</button>
            {storedInfo.errorMessage ? <label className="failMessage">{storedInfo.message}</label> : null}
        </div>
    )
}

export default Register