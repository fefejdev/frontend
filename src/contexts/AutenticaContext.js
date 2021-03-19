import React, {useContext,useEffect,useState} from 'react'
import {storage, database, auth, firestore,fb} from '../fb'

const AutenticaContext = React.createContext();
export function useAuth(){
    return useContext(AutenticaContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password){
        
        auth.createUserWithEmailAndPassword(email, password)
    }

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
    
    function signInAnonymously(){
        return auth.signInAnonymously()
    }

    function uploadFile(file){
        storage.ref('users/' + currentUser.uid + "/" + file.name).put(file)
    }
    function getUsers(){
        const users = []
        database.ref('users/').on('value', (snapshot) =>{
                snapshot.forEach(function(snap){
                    if(snap.val()){
                        users.push(snap.val())
                    }
                })
        })

        return users
        }
    function getMessages(){
        
    }
    function storeUser(user){
            console.log("success")
            firestore.collection('users').doc()
    }

    function logout(){
        database.ref('users/').child(currentUser.uid).get().then(function (snapshot){
            if(snapshot.exists()){
                console.log('this user is not logged anymore')
                database.ref('users/' + currentUser.uid).update({
                    isOnline: false
                })
            }
        }
        )
        return auth.signOut()
    }

    function isCurrentUserFull() {
        if(currentUser != null){
            return true } else {
                return false
            }
        }
    

    function signIn(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function getConversationsMessages() {
        
    }
    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            console.log("user set")
            setCurrentUser(user)
            

            if(user != null){
                storeUser(user)
                
            } 
            
            setLoading(false)
            
        })

        
    }, [])

    const value = {
        currentUser,
        getUsers,
        signUp,
        signInAnonymously,
        logout,
        sendMessage,
        signIn,
        uploadFile,
    }
    return (
        <div>
            <AutenticaContext.Provider value={value}>
                {!loading && children}
            </AutenticaContext.Provider>
        </div>
    )
}
