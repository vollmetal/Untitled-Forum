import { Box, Button, List, ListItem, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { API_URL, POST_URL } from "../env";
import * as Themes from "../Styles/Themes";
import PostPreview from "./PostPreview";



function PostList (props) {

    const [postList, setPostList] = useState([])
    const [postElements, setPostElements] = useState([])
    const [retrievingInfo, setRetrievingInfo] = useState(false)
    const [errorIndo, setErrorInfo] = useState({})
    const { isAuthenticated } = useSelector((state) => state.user)
    const theme = useSelector((state) => state.theme).theme

    useEffect(() => {
        getPostList()
    }, [props])


    const getPostList = async () => {
        setRetrievingInfo(true)
        try {
            const result = await fetch(`${API_URL}/${POST_URL}/`)
            const list = await result.json()
            const finishedList = await makePostCards(list.posts)
            setPostElements(finishedList)
        } catch {
            console.log('There was an error getting to the server!')
        } finally {
            setRetrievingInfo(false)
        }
    }

    const makePostCards = (posts) => {
        const tempPostElements = posts.map((post) => {
            const fullPost = {
                id: post._id,
                name: post.name,
                content: post.content,
                comments: post.comments,
                likes: post.likes,
                posterName: post.posterName
            }
            console.log(fullPost)
            const itemList = <ListItem key={fullPost.id}>
            <PostPreview props={fullPost} />
            </ListItem>

            return itemList
        })
        return tempPostElements
    }

    return (
        <Box sx={{margin: '50px', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            {isAuthenticated ? <NavLink to='/new-post-menu'><Button sx={{
                            bgcolor: theme.palette.secondary,
                            m: theme.buttonMargins
                        }} variant='contained'>Make New Post</Button></NavLink> : null}
            {!retrievingInfo ? <List>
                {postElements}
            </List>: <Skeleton sx={{margin:'10%', padding:'30%'}} variant="rectangular"/>}
        </Box>
    )
}

export default PostList