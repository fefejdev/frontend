import {RequestUsers,RequestUsersSuccess,RequestConversation,RequestConversationFailure} from '../DispatchTypes'

const userState = {
    allUsers: [],
    conversation: []
}

export default (state = userState, action) =>{
    switch(action.type){
        case RequestUsers:
            break;
        case RequestUsersSuccess:
            state = {
                ...state,
                allUsers: action.payload.allUsers
            }
            break;
        case RequestConversation:
            state = {
                ...state,
                conversation: action.payload.mensagens
            }
            break;
        case RequestConversationFailure:
            state ={
                ...state,
                conversation: []
            }
            break;
    }

    return state
}