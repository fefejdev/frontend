import React, {useContext,useEffect,useState} from 'react'
import {database, auth, firestore,fb} from '../fb'

const AutenticaContext = React.createContext();
export function useAuth(){
    return useContext(AutenticaContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [disableButtons, setDisabledButtons] = useState(true)

    function sendMessage(message, uid2){
        const conversationDoc = firestore.collection('conversations').doc()

        conversationDoc.set({
            uid: currentUser.uid,
            uid2: uid2
        }
        )

        conversationDoc.collection('messages').add({
            sender: currentUser.uid,
            message: message,
        }
        )
    }
    
    function signUp(){
        return auth.signInAnonymously()
    }
  
    function storeUser(user){
            console.log("success")
            database.ref('users/').child(user.uid).get().then(function (snapshot){
                if(snapshot.exists()){
                    console.log('already exists')
                    database.ref('users/' + user.uid).update({
                       isOnline: true 
                    })
                } else {
                    console.log('setting')
                    database.ref('users/' + user.uid).set({
                                    id: user.uid,
                                    isAnonymous: user.isAnonymous,
                                    isOnline: true
                                })
                }
            })    
    }

    function logout(){
        return auth.signOut()
    }

    function signIn(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setDisabledButtons(false)

            if(user != null){
                storeUser(user)
            } 
        })


    }, [])

    const value = {
        currentUser,
        signUp,
        logout,
        sendMessage,
        signIn,
    }
    return (
        <div>
            <AutenticaContext.Provider value={value}>
                {children}
            </AutenticaContext.Provider>
        </div>
    )
}
