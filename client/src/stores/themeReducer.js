import { createSlice } from '@reduxjs/toolkit'
import * as Theme from '../Styles/Themes'

export const themeReducer = createSlice({
    name: 'Theme',
    initialState: {
        theme: Theme.lightTheme
    },
    reducers: {
        setCurrentTheme: (state, action) => {
            state.theme = action.payload.theme
                        
        },
        clearCurrentTheme: (state) => {
            state.theme = Theme.lightTheme
        }
    }
})

export const {setCurrentTheme, clearCurrentTheme} = themeReducer.actions

export default themeReducer.reducer;