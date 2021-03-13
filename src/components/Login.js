import React, {useState} from "react"
import fb, {auth} from "../fb"
import {useAuth} from '../contexts/AutenticaContext'
import {Link, BrowserRouter as Router, useHistory} from 'react-router-dom'

const Login = () =>{
    const {signUp, currentUser, logout, disableButtons, storeAnonymousUser} = useAuth()
    const history = useHistory()
    const [error, setError] = useState()

    async function createNewAnonymousUser(){
        if(currentUser){
            history.push("/")
        } else {
            try {
                await signUp()
                console.log('uid' + fb.currentUser.uid)
                storeAnonymousUser(currentUser)
                history.push("/")
            } catch  {
                setError("Não foi possível criar um perfil")
            }
        }
    }

    return(
        <section className="login">
            <div className="loginContainer">
                        <h1>Login - Voluntário</h1>

                            <div className="btnContainer">
                                <p>{error}</p>
                                <p> {currentUser && currentUser.uid} </p>
                                <p> {currentUser && currentUser.isAnonymous} </p>
                                <button disabled={disableButtons} onClick={createNewAnonymousUser()}>Entrar</button>
                                <button type="submit" onClick={logout}>Logout</button>
                            </div>
                </div>
        
        </section>
    );
}

export default Login;