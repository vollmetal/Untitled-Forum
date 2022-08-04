const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authentication');


const SALT_ROUNDS = 10

const User = require('../schemas/user')

userRouter.post('/new', async (req, res) => {
    const userInfo = req.body

    const currentUser = await User.findOne({ name: userInfo.name })
    if (currentUser != null) {
        res.json({ success: false, message: "Account already exists with this username!" })
    } else {
        bcrypt.hash(userInfo.password, SALT_ROUNDS, async (error, hash) => {
            if (error) {
                res.json({ success: false, message: `Error ${error}, user not registered!` })
            }
            else {
                const newUser = User({
                    name: userInfo.name,
                    email: userInfo.email,
                    password: hash,
                    profileURL: userInfo.profileURL,
                    aboutMe: userInfo.aboutMe,
                    isAdmin: false,
                    favoriteForumIds: []
                })

                newUser.save((error) => {
                    if (error) {
                        res.json({ success: false, message: error, currentData: userInfo})
                    } else {
                        res.json({ success: true, message: `Profile ${userInfo.name} successfully made!` })
                    }
                })
            }
        })
    }
})

userRouter.post('/update', authenticate, async (req, res) => {
    console.log(req.body)
    const userInfo = req.body
    const userUpdateInfo = {
        name: userInfo.name,
        email: userInfo.email,
        profileURL: userInfo.profileURL,
        aboutMe: userInfo.aboutMe
    }
            try {
                const updatedUser = await User.findByIdAndUpdate(userInfo.userId, userUpdateInfo)
                res.json({ success: true, user: updatedUser })
            } catch {
                res.json({ success: false, message: "Failed to update user", currentData: userInfo })
            }
})

userRouter.get('/find', authenticate, async (req, res) => {
    const userId = req.body.userId

    try {
        const foundUser = await User.findById(userId)
        res.json({ success: true, user: foundUser })
    } catch {
        res.json({ success: false, message: "Failed to find user", currentData: userId })
    }
})

userRouter.get('/findbyid/:userId', async (req, res) => {
    const userId = req.params.userId

    try {
        const foundUser = await User.findById(userId)
        res.json({ success: true, user: foundUser })
    } catch {
        res.json({ success: false, message: "Failed to find user", currentData: userId })
    }
})

userRouter.post('/login', async (req, res) => {
    const {name, password} = req.body

    try {
        const foundUser = await User.findOne({ name: name })
        if(foundUser) {
            bcrypt.compare(password, foundUser.password, (error, result) => {
                if(result) {
                    const token = jwt.sign({id: foundUser.id}, 'LINUSTORVALDS')
                    res.json({success: true, name: foundUser.name, token: token})
                } else {
                    res.json({success: false, message: 'Password entered was incorrect!', currentData: req.body})
                }
            })
        } else {
            res.json({success: false, message: `user ${email} not found`, currentData: req.body})
        }
    } catch {

    }
})

userRouter.delete('/delete/:userId', async (req, res) => {
    const userId = req.params.userId

    try {
        const foundUser = await User.findByIdAndDelete(userId)
        res.json({ success: true, message: "Successfully deleted user!" })
    } catch {
        res.json({ success: false, message: "Failed to delete user", currentData: userId })
    }
})

module.exports = userRouter;