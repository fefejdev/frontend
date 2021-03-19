import {combineReducers} from 'redux'
import UserReducer from './UsersReducer'
import AuthenticationReducer from './AuthenticationReducer'

const RootReducer = combineReducers({
    authentication: AuthenticationReducer,
    users: UserReducer
})

export default RootReducer