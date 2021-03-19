import {RequestLogin, LoginFailure,LoginSuccess, LogoutFailure,LogoutSuccess, RequestLogout} from '../DispatchTypes'
const userState = {
    displayName: "",
    loading: false,
    userLoaded: false,
    error: null
}

export default (state = userState, action) =>{
    console.log(action)
    switch(action.type){
        case RequestLogin:
            state = {
                ...state,
                loading: true
            }
            break;
        case LoginSuccess:
            state = {
                ...state,
                ...action.payload.loggedUser,
                loading: false,
                userLoaded: true
            }
            break;
        case LoginFailure:
            state = {
                ...state,
                loading: false,
                userLoaded: false,
                error: action.payload.e
            }
            break;
        case RequestLogout:
            console.log('requesting logout')
            break;
        case LogoutSuccess:
            state = {
                displayName: "",
                loading: false,
                userLoaded: false
            }
            break;
        case LogoutFailure:
            console.log('changing state')
            state = {
                ...state,
                error: action.payload.e
            }
            break;
        
    }

    console.log(state)
    return state
}