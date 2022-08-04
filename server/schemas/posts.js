const mongoose = require('mongoose')
const Comment = require('./comment')

const postSchema = new mongoose.Schema({
    name: String,
    posterName: String,
    content: String,
    likes: Number,
    comments: [{
        id: String,
        posterName: String,
        content: String,
        likes: Number
    }]
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post