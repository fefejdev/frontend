import {firestore} from '../fb'
import {RequestUsers,RequestUsersFailure,RequestUsersSuccess} from './DispatchTypes'

export const getAllUsers = (user) =>{

    return async (dispatch) => {
        const allUsers = []
        const unsubscribe = firestore.collection('usuarios').onSnapshot((querySnapshot) => {
            querySnapshot.forEach(function(document) {
                if(document.data().uid != user.uid && document.data.isVolunteer != user.isVolunteer){
                    allUsers.push(document.data())
                }
            }
            )

            dispatch({
                type: RequestUsersSuccess,
                payload: {allUsers}
            })
        }

        )

        return unsubscribe
    }
}