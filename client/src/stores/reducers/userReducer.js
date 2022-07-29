import * as userActions from '../actiontypes/useractions'

const initialState = {
    isAuthenticated: false,
    token: '',
    username: '',
    profilePicture: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.LOGIN:
            return {
                isAuthenticated: true,
                token: action.payload.token,
                username: action.payload.username,
                profilePicture: action.payload.profilePicture
            }
        case userActions.LOGOUT:
            return {
                isAuthenticated: false,
                token: '',
                username: '',
                profilePicture: ''
            }
    };


    return state;
}

export default userReducer;