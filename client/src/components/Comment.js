import { Box, Button, Typography } from "@mui/material";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, POST_URL } from "../env";
import { setCurrentPost } from "../stores/postReducer";

function Comment (props) {
    const { username, isAuthenticated } = useSelector((state) => state.user)
    const post = useSelector((state) => state.post)
    const theme = useSelector((state) => state.theme).theme

    const dispatch = useDispatch()

    useEffect(() => {

    })

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
            
        }
    }

    const deleteComment = async () => {
        try {
            const result = await fetch(`${API_URL}/${POST_URL}/comment`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({
                    postId: post.id,
                    commentId: props.props._id
                })
            })
            const debugResults = result.json()
            reloadPost()
        } catch {

        }
    }

    const insertHTML = (info) => {
        return {__html:info}
    }

    return (
        <Box border='solid' borderRadius={4} padding={2}>
            <Typography variant="h5" sx={{borderBottomStyle: 'solid'}}>
                {props.props.posterName}
            </Typography>
                <div dangerouslySetInnerHTML={insertHTML(props.props.content)}></div>
            
            {username === props.props.posterName ? <Button sx={{
                            bgcolor: theme.palette.secondary
                        }} onClick={deleteComment} variant="contained">
                Delete Comment
            </Button>: null}
        </Box>
    )
}

export default Comment