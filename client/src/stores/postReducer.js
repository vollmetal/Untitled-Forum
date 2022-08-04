import { createSlice } from '@reduxjs/toolkit'

export const postReducer = createSlice({
    name: 'Post',
    initialState: {
        id: "",
        name: "placeholder",
        content: "",
        comments: [],
        likes: 0,
        posterName: "placeholder"
    },
    reducers: {
        setCurrentPost: (state, action) => {
            state.id = action.payload.id
            state.name = action. payload.name
            state.content = action.payload.content
            state.comments = action.payload.comments
            state.likes = action.payload.likes
            state.posterName = action.payload.posterName
                        
        },
        clearCurrentPost: (state) => {
            state.id = ""
            state.name = "placeholder"
            state.content = ""
            state.comments = []
            state.likes = 0
            state.posterName = "placeholder"
        }
    }
})

export const {setCurrentPost, clearCurrentPost} = postReducer.actions

export default postReducer.reducer;