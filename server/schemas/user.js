const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileURL: String,
    aboutMe: String,
    isAdmin: Boolean,
    favoriteForumIds: Array
})

const User = mongoose.model("User", userSchema)

module.exports = User