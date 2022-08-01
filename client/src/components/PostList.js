import { Box, Button, List, Skeleton } from "@mui/material";
import { useState } from "react";
import * as lightStyles from "../Styles/lightStyle";



function PostList () {

    const [postList, setPostList] = useState({})
    const [retrievingInfo, setRetrievingInfo] = useState(false)
    const [errorIndo, setErrorInfo] = useState({})

    return (
        <Box sx={{margin: '50px'}}>
            <Button sx={lightStyles.MainButton} variant='contained'>Make New Post</Button>
            {!retrievingInfo ? <List>

            </List>: <Skeleton sx={{margin:'10%', padding:'30%'}} variant="rectangular"/>}
        </Box>
    )
}

export default PostList