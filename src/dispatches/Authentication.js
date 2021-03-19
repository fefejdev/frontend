
import { auth, firestore } from "../fb";
import {RequestLogin,LoginSuccess,LoginFailure,RequestLogout,LogoutSuccess,LogoutFailure} from './DispatchTypes'

export const signUp = (user) =>{

    return async (dispatch) => {
        
        dispatch({
            type: RequestLogin
        })
        auth.createUserWithEmailAndPassword(user.email, user.password).then(
            data =>{
                const currentUser = auth.currentUser
                const displayname = user.firstName + " "+ user.lastName
                
                currentUser.updateProfile({
                    displayName: displayname
                }).then(() =>{
                    firestore.collection('usuarios').doc(data.user.uid).set(
                        {
                            displayName: displayname,
                            uid: data.user.uid,
                            createdAt: new Date(),
                            isVolunteer: true,
                            isOnline: true
                        }
                    ).then(() =>{

                        const User = {
                            displayName: displayname,
                            uid: data.user.uid,
                            isVolunteer: true
                        }

                        localStorage.setItem('user', JSON.stringify(User))

                        dispatch({
                            type: LoginSuccess,
                            payload: {loggedUser: User}
                        })
                    }).catch(e =>{
                        dispatch({
                            type: LoginFailure,
                            payload: { e }
                        })
                    })
                })
            }
        )
    }
}


export const signInAnonymously = (user) =>{

    return async (dispatch) => {
        
        dispatch({
            type: RequestLogin
        })
        auth.signInAnonymously().then(
            data =>{
                const currentUser = auth.currentUser
                console.log(currentUser)
                const displayname = user.firstName + " "+ user.lastName
                    firestore.collection('usuarios').doc(data.user.uid).set(
                        {
                            displayName: displayname,
                            uid: data.user.uid,
                            createdAt: new Date(),
                            isVolunteer: false,
                            isOnline: true
                        }
                    ).then(() =>{

                        const User = {
                            displayName: displayname,
                            uid: data.user.uid,
                            isVolunteer: false
                        }
                        
                        localStorage.setItem('user', JSON.stringify(User))
                        
                        dispatch({
                            type: LoginSuccess,
                            payload: {loggedUser: User}
                        })
                    }).catch(e =>{
                        dispatch({
                            type: LoginFailure,
                            payload: { e }
                        })
                    })
                })
            } 
    }


export const signIn = (user) =>{

    return async dispatch =>{
        dispatch({
            type: RequestLogin
        })

        console.log(user.email)
        auth.signInWithEmailAndPassword(user.email, user.password).then((data) =>{
            firestore.collection('usuarios').doc(data.user.uid).update({
                isOnline: true
            }).then(() =>{
                const name = data.user.displayName

                const User = {
                    displayName: data.user.displayName,
                    uid: data.user.uid,
                    isVolunteer: true
                }

                localStorage.setItem('user', JSON.stringify(User))

                dispatch({
                    type: LoginSuccess,
                    payload: {loggedUser: User}
                })
            }).catch(e =>{
                dispatch({
                    type: LoginFailure,
                    payload: { e }
                })
            })
        })
    }
}


export const isUserLogged = () =>{
    return async dispatch =>{
        const loggedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

        if(loggedUser){
            dispatch({
                type: LoginSuccess,
                payload: { loggedUser }
            })
        } else {
            dispatch({ 
                type: LoginFailure,
                payload: {e: 'Não foi possível efetuar o login, tente novamente'}
            })
        }
    }
}

export const logout = (uid) => {
    return async dispatch =>{
        dispatch ({type: RequestLogout})

        firestore.collection('usuarios').doc(uid).update({
            isOnline: false
        })
        .then(() =>{
            auth.signOut().then(() => {
                localStorage.clear()
                dispatch({type: LogoutSuccess})
            }).catch(e =>{
                dispatch({type: LogoutFailure, payload: {e}})
            })
        })
    }

}