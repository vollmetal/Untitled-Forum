import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postReducer";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

export default configureStore ({
    reducer: {
        user: userReducer,
        post: postReducer,
        theme: themeReducer
    }
})