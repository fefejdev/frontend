import React, {useContext,useEffect,useState} from 'react'
import {auth, fb} from '../fb'

const AutenticaContext = React.createContext();
var database = fb.database()
export function useAuth(){
    return useContext(AutenticaContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [disableButtons, setDisabledButtons] = useState(true)

    function signUp(){
        return auth.signInAnonymously()
    }
  
    function storeUser(user){
            console.log("success")
            database.ref('users/' + user.uid).set({
                id: user.uid,
                isAnonymous: user.isAnonymous,
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
        disableButtons,
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
