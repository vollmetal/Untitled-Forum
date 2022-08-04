import { Alert, Box, Button, Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { API_URL, POST_URL } from "../env";
import { setCurrentPost } from "../stores/postReducer";
import Comment from "./Comment";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

function PostView(props) {
    const { username, isAuthenticated } = useSelector((state) => state.user)
    const theme = useSelector((state) => state.theme).theme
    const post = useSelector((state) => state.post)

    const dispatch = useDispatch()

    const [comments, setComments] = useState([])
    const [storedComment, setStoredComment] = useState({})
    const [rtValue, setRtValue] = useState("")


    useEffect(() => {
        createCommentSection()
    }, [post])

    const reloadPost = async () => {
        try {
            const response = await fetch(`${API_URL}/${POST_URL}/search/${post.id}`)
            const sanitizedResponse = await response.json()
            const fullPost = {
                id: sanitizedResponse.posts._id,
                name: sanitizedResponse.posts.name,
                content: sanitizedResponse.posts.content,
                comments: sanitizedResponse.posts.comments,
                likes: sanitizedResponse.posts.likes,
                posterName: sanitizedResponse.posts.posterName
            }
            dispatch(setCurrentPost(fullPost))
        } catch {
            setStoredComment({
                ...storedComment,
                errorMessage: 'There was an error sending the post'
            })
        }
    }

    const saveNewComment = async () => {
        try {
            const response = await fetch(`${API_URL}/${POST_URL}/comment/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({
                    postId: post.id,
                    posterName: username,
                    content: rtValue,
                })
            })
            const sanitizedResponse = await response.json()
            await reloadPost()
        } catch {
            setStoredComment({
                ...storedComment,
                errorMessage: 'There was an error sending the post'
            })
        }
    }

    const createCommentSection = () => {
        try {
            const commentInfoElements = post.comments.map(comment => {
                return <ListItem key={`${comment._id}- ${comment.posterName}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}><Comment props={comment} /></ListItem>
            })
            setComments(commentInfoElements)
        } catch {
            console.log(`${post.comments} is not an array!`)
        }

    }

    const insertHTML = (info) => {
        return {__html:info}
    }

    return (
        <Box>
            <Card sx={{ margin: '50px', bgcolor: theme.palette.primary }}>
                <CardContent>

                    <Box sx={{ display: 'flex', padding: '20px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', m: '10px' }}>
                            <Typography gutterBottom variant="h1" component="div">{post.name}</Typography>
                            <Typography sx={{ mb: 1.5 }}>By {post.posterName}</Typography>
                            <div dangerouslySetInnerHTML={insertHTML(post.content)}></div>
                        </Box>


                    </Box>

                </CardContent>
            </Card>
            
            <Card sx={{margin: '50px', padding: '20px' , bgcolor: theme.palette.primary }}>
                <Typography variant="h3">Comments</Typography>
                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
                    {comments}
                </List>
            </Card>

            {isAuthenticated ? <Card sx={{margin: '50px', bgcolor: theme.palette.primary }}>
                <CardContent sx={{ padding: '20px' }}>
                    <Typography sx={{
                        
                    }} variant="h4">
                        Make a new comment
                    </Typography>
                    <ReactQuill sx={{bgcolor:'white'}} theme="snow" value={rtValue} onChange={setRtValue}/>
                    <Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant="contained" className="submitButton" onClick={saveNewComment}>
                        Create comment
                    </Button>
                    {storedComment.errorMessage ? <Alert severity="error">{storedComment.errorMessage}</Alert> : null}

                </CardContent>
            </Card> : <Card>
                <Typography>
                    <NavLink to='/login'><Button variant="contained" sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }}>Please sign in to comment</Button></NavLink>
                </Typography>
            </Card>}

        </Box>
    )
}

export default PostView