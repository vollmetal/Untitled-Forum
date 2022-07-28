const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authentication');

const SALT_ROUNDS = 10

const User = require('../schemas/user')

userRouter.post('/new', async (req, res) => {
    const userInfo = req.body

    const currentUser = await User.findOne({ email: userInfo.email })
    if (currentUser != null) {
        res.json({ success: false, message: "Account already exists for this email!" })
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
                    profileURL: userInfo.profilePicture,
                    aboutMe: userInfo.aboutMe,
                    isAdmin: false,
                    favoriteForumIds: []
                })

                newUser.save((error) => {
                    if (error) {
                        res.json({ success: false, message: error })
                    } else {
                        res.json({ success: true, message: `Profile ${userInfo.name} successfully made!` })
                    }
                })
            }
        })
    }
})

userRouter.post('/update', async (req, res) => {
    const userInfo = req.body

    bcrypt.hash(userInfo.password, SALT_ROUNDS, async (error, hash) => {
        if (error) {
            res.json({ success: false, message: `failed to update!` })
        } else {
            const userUpdateInfo = {
                name: userInfo.name,
                email: userInfo.email,
                password: hash,
                profileURL: userInfo.profilePicture,
                aboutMe: userInfo.aboutMe,
                favoriteForumIds: userInfo.favoriteForumIds
            }


            try {
                const updatedUser = await User.findByIdAndUpdate(userInfo.id, userUpdateInfo)
                res.json({ success: true, user: updatedUser })
            } catch {
                res.json({ success: false, message: "Failed to update user" })
            }
        }
    })
})

userRouter.get('/find/:userId', authenticate, async (req, res) => {
    const userId = req.params.userId

    try {
        const foundUser = await User.findById(userId)
        res.json({ success: true, user: foundUser })
    } catch {
        res.json({ success: false, message: "Failed to find user" })
    }
})

userRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const foundUser = await User.findOne({ email: email })
        if(foundUser) {
            bcrypt.compare(password, foundUser.password, (error, result) => {
                if(result) {
                    const token = jwt.sign({id: foundUser.id}, 'LINUSTORVALDS')
                    res.json({success: true, username: foundUser.username, token: token})
                } else {
                    res.json({success: false, message: error})
                }
            })
        } else {
            res.json({success: false, message: `user ${email} not found`})
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
        res.json({ success: false, message: "Failed to delete user" })
    }
})

module.exports = userRouter;