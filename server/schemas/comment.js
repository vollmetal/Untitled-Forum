const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    id: String,
    posterName: String,
    content: String,
    likes: Number
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment