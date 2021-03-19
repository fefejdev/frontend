import React, { useState , useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../dispatches/Authentication'
import {getAllUsers,getConversation,sendMessage} from '../dispatches/Users'
import { Link, Redirect } from "react-router-dom"


const ChatTab = (props) => {
    const {onClick, userData} = props
    return (
        <div onClick={() => onClick(userData)}>
            <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span className="username">{userData.displayName}</span>
            </div>
        </div>
    )
}

const Dashboard = () => { 
    const [chatStart,setChatStart] = useState(false)
    const [message, setMessage] = useState()
    const [destinationUser, setDestinationUser] = useState(null)
    const userhandler = useSelector(state => state.users)
    const authenticator = useSelector(state => state.authentication)
    const dispatch = useDispatch()
    let unsubscribe

    useEffect(() => {
            unsubscribe = dispatch(getAllUsers(authenticator)).then(unsubscribe =>{
                return unsubscribe;
            }).catch(e => {
                console.log(e)
            })
        }, [])
    
    useEffect(() => {
        return () =>{
            unsubscribe.then(event => event()).catch(e => console.log(e))
        }
    }, [])

    
    
    const startChat = (userData) =>{
        setChatStart(true)
        setDestinationUser(userData.uid)
        
        dispatch(getConversation({uid_1: authenticator.uid, uid_2: userData.uid}))
    }

    const sendNewMessage = (e) =>{
        const msg = {
            user_uid_1: authenticator.uid,
            user_uid_2: destinationUser,
            message
        }

        if(message != ""){
            dispatch(sendMessage({user_uid_1: authenticator.uid, user_uid_2: destinationUser, message: message}))
            setMessage('')
        }
    }

    if(!authenticator.userLoaded){
        return <Redirect to="/"/>
    }

    
   
    return(
        <section className="main">
            <nav>
                <h2>CFB</h2>
                <div className="btnContainerNav">
                    <Link to="/"><button>Voltar para a página inicial</button></Link>
                    <button onClick={() => {
                        dispatch(logout(authenticator.uid))
                    }}>Logout</button>
                </div>
            </nav> 
            <section className="chatItems">

                <div className="allUsersTab">
                    {userhandler.allUsers.length > 0 ?
                    userhandler.allUsers.map(user =>{
                        return(
                            <ChatTab
                                onClick={startChat}
                                userData = {user}
                                />
                            )
                        }):(null)}
                </div>

                <div className="chat">
                    <div className="messages">
                        {chatStart ?
                        userhandler.conversation.map(msg =>
                            <div style={{ textAlign: msg.user_uid_1 == authenticator.uid ? 'right' : 'left' }}>
                                <p className={msg.user_uid_1 == authenticator.uid ? 'message' : 'messageForeign'}>{msg.message}</p> 
                            </div>
                            ) : (null)
                        }
                    </div> 
                    <div>
                        {
                            chatStart ? 
                            <div className="sendMessages">
                                <textarea className="inputText"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escreva sua mensagem"/>
                                    <button className="submitButton" onClick={sendNewMessage}>Enviar</button>
                                </div>
                            : (null)
                        }
                    </div>
                </div>  
               
            </section>

          

                 
        </section>
    )
}

export default Dashboard;