import {firestore} from '../fb'
import {RequestConversation, RequestUsers,RequestUsersSuccess} from './DispatchTypes'

export const getAllUsers = (user) =>{

    return async (dispatch) => {
        
        dispatch({type:RequestUsers})
        const unsubscribe = firestore.collection('usuarios').onSnapshot((querySnapshot) => {
            const allUsers = [] //sempre que houver atualização ele limpa o array para fazer as operações
            querySnapshot.forEach(function(document) {
                if(document.data().uid != user.uid && document.data().isVolunteer != user.isVolunteer && document.data().isOnline){
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

export const sendMessage = (msg) =>{
    return async dispatch => {
        firestore.collection('mensagens')
        .add({
            ...msg,
            enviadoEm: new Date()
        })
        .then((data) => {
            console.log('message sent')
        })
        .catch(error =>{
            console.log(error)
        })
    }
}

export const getConversation = (userData) =>{
    return async dispatch => {
        firestore.collection('mensagens').where('user_uid_1', 'in', [userData.uid_1, userData.uid_2]).orderBy('enviadoEm', 'asc')
        .onSnapshot((querySnapshot) => {
            const mensagens = [] //garante que não haja mensagens multiplicadas ao sempre limpar o array

            querySnapshot.forEach(document => {
                if((document.data().user_uid_1 == userData.uid_1 && document.data().user_uid_2 == userData.uid_2) 
                ||
                (document.data().user_uid_1 == userData.uid_2 && document.data().user_uid_2 == userData.uid_1) 
                ){
                    mensagens.push(document.data())
                }
            })

            dispatch({
                type: RequestConversation,
                payload: {mensagens}
            })
        })
    }
}