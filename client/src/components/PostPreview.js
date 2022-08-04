import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, List, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL, POST_URL } from "../env";
import { setCurrentPost } from "../stores/postReducer";

function PostPreview(props) {

    const [postInfo, setPostInfo] = useState(props)

    const { username, isAuthenticated } = useSelector((state) => state.user)
    const theme = useSelector((state) => state.theme).theme
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const goToPost = () => {
        dispatch(setCurrentPost(postInfo.props))
        navigate('/post-view')
    }

    const deletePost = async () => {
        try {
            const response = await fetch(`${API_URL}/${POST_URL}/delete/${postInfo.props.id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
                }
            })
        } catch {

        }
    }

    const insertHTML = () => {
        return {__html:postInfo.props.content}
    }

    return (

        <Card sx={{ margin: '20px', bgcolor: theme.palette.primary, width: '100%' }}>

            <CardContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                        <CardActionArea onClick={goToPost}>
                            <Typography gutterBottom variant="h5" component="div">{postInfo.props.name}</Typography>
                            <Typography sx={{ mb: 1.5, borderBottomStyle:'solid', borderBottomWidth: 2 }} color="text.secondary" >By {postInfo.props.posterName}</Typography>
                            <div dangerouslySetInnerHTML={insertHTML()}></div>
                            <Typography sx={{borderTopStyle: 'solid', borderTopWidth: 2, mt: '10px'}}>{postInfo.props.comments.length} Comments</Typography>
                        </CardActionArea>
                        {username === postInfo.props.posterName ? <Button sx={{
                            bgcolor: theme.palette.alert
                        }} onClick={deletePost} variant="contained">
                            Delete Post
                        </Button> : null}
                    </Box>

            </CardContent>

        </Card>
    )
}

export default PostPreview