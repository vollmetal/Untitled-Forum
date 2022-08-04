const express = require('express');
const postRouter = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authentication');
const Post = require('../schemas/posts');

postRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        console.log(posts)
        res.json({success: true, posts: posts})
    } catch {
        res.json({success: false, message: "Error cannot get posts!"})
    }
    
})

postRouter.get('/search/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        console.log(posts)
        res.json({success: true, posts: posts})
    } catch {
        res.json({success: false, message: "Error cannot get posts!"})
    }
    
})

postRouter.post ('/new', authenticate, async (req, res) => {
    const postInfo = req.body
    

    if (postInfo) {
        const newPost = Post({
            name: postInfo.name,
            posterName: postInfo.posterName,
            content: postInfo.content,
            likes: 0,
            comments: []

        })

        newPost.save((error) => {
            if (error) {
                res.json({ success: false, message: error, currentData: postInfo})
            } else {
                res.json({ success: true, message: `Post ${postInfo.name} successfully made!` })
            }
        })
    } else {
        res.json ({ success: false, message: "Couldn't make the post. Post info was null", currentData: req.body})
    }

})

postRouter.delete('/delete/:postId', authenticate, async (req, res) => {
    const postId = req.params.postId

    try {
        const foundUser = await Post.findByIdAndDelete(postId)
        res.json({ success: true, message: "Successfully deleted post!" })
    } catch {
        res.json({ success: false, message: "Failed to delete post", currentData: postId })
    }
})

postRouter.post('/comment/new', authenticate, async (req, res) => {
    const commentInfo = req.body

    try {
        const result = await Post.findById(commentInfo.postId)
        result.comments.push(commentInfo)
        result.save()
        res.json({success: true, message: 'Created new comment'})
    } catch {
        res.json({success: false, message: 'failed to make new comment', currentData: commentInfo})
    }
})

postRouter.delete('/comment', authenticate, async (req, res) => {
    const commentInfo = req.body
    console.log(commentInfo)

    try {
        const result = await Post.findById(commentInfo.postId)
        
        const commentIndex = 0
        //const comment = result.comments.findIndex(comment => comment.id === commentIndex.commentId)
        const comment = result.comments.filter(comment => {return comment._id != commentInfo.commentId})
        console.log(comment)
        const updatedComments = await result.updateOne({
            comments: comment
        })
        res.json({success: true, message: 'Deleted comment', currentData: comment})
    } catch {
        res.json({success: false, message: 'failed to make new comment', currentData: commentInfo})
    }
})

module.exports = postRouter;