import { useEffect, useState } from "react"



function ProfilePage () {
    const [profileInfo, setprofileInfo] = useState({})

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
        try {
            const fetchedInfo = await fetch('http://localhost:4200/user/find', {
            method:'GET',
            headers: {
                'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
            }
        })
        const userInfo = await fetchedInfo.json()
        console.log(userInfo)
        if(userInfo.success) {
            setprofileInfo({
                ...profileInfo,
                name: userInfo.user.name,
                email: userInfo.user.email,
                profileURL: userInfo.user.profileURL,
                aboutMe: userInfo.user.aboutMe
            })
        } else {
            console.log(`ERROR: ${userInfo.message}` )
            console.log(`data from server below!`)
            console.log(userInfo.currentData)
        }
        } catch {
            console.log("ERROR: Couldn't fetch information!")
        }
    }

    const saveUpdatedInfo = async () => {
        try {
            const fetchedInfo = await fetch('http://localhost:4200/user/update', {
            method:'POST',
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
        if(userInfo.success) {
            setprofileInfo({
                ...profileInfo,
                name: userInfo.user.name,
                email: userInfo.user.email,
                profileURL: userInfo.user.profileURL,
                aboutMe: userInfo.user.aboutMe
            })
        } else {
            console.log(`ERROR: ${userInfo.message}` )
            console.log(`data from server below!`)
            console.log(userInfo.currentData)
        }
        } catch {
            console.log("ERROR: Couldn't update information!")
        }
    }

    return (
        <div>
            <h1 className="pageHeader">{profileInfo.name}'s Profile</h1>
            <div className="profilePictureEdit">
            <div className="fieldInput">
                    <label>URL for profile picture: </label>
                    <input onChange={updateStoredInfo} type='text' name='profileURL' value={profileInfo.profileURL}/>
                </div>
            </div>
            <div className="basicProfileInfo">
                <div className="fieldInput">
                    <label>Username: </label>
                    <input onChange={updateStoredInfo} type='text' name='name' value={profileInfo.name}/>
                </div>
                <div className="fieldInput">
                    <label>email: </label>
                    <input onChange={updateStoredInfo} type='text' name='email' value={profileInfo.email}/>
                </div>
            </div>
            <div className="aboutMeField">
            <div className="fieldInput">
                    <label>About Me: </label>
                    <input onChange={updateStoredInfo} type='text' name='aboutMe' value={profileInfo.aboutMe}/>
                </div>
            </div>
            <button onClick={saveUpdatedInfo}>Update</button>

        </div>
    )

}

export default ProfilePage