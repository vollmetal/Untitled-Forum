import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
    name: 'User',
    initialState: {
        isAuthenticated: false,
        token: '',
        username: '',
        profilePicture: ''
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.username = action.payload.name
            localStorage.setItem('userToken', action.payload.token)            
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.token = ''
            state.username = ''
            localStorage.removeItem('userToken')
        },
        register: (state, action) => {
            console.log(action.payload)
            state.isAuthenticated = true
            state.token = action.payload.token
            state.username = action.payload.name
            localStorage.setItem('userToken', action.payload.token)

        },
        decrypt: (state, action) => {

        }
    }
})


export const {login, logout, register, decrypt} = userReducer.actions

export default userReducer.reducer;