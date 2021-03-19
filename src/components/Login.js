import React, {useState} from "react"
import {signInAnonymously} from '../dispatches/Authentication'
import {useAuth} from '../contexts/AutenticaContext'
import {
    BrowserRouter as Router, useHistory,Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

const Login = () =>{
    const history = useHistory()
    const [error, setError] = useState()
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const dispatch = useDispatch()
    const authenticator = useSelector(state => state.authentication)

    const handleAnonymousLogin = (e) =>{
        e.preventDefault()
        
        const user = {
            firstName: name,
            lastName: lastName
        }
        dispatch(signInAnonymously(user))
        
    }

    if(authenticator.userLoaded){
        console.log(authenticator)
        return <Redirect to="/dashboard"/>
    }

    return(
        <section className="login">
            <div className="loginContainer">
                <h1>Login</h1>
                <form onSubmit={handleAnonymousLogin}>
                    <label>Nome</label>
                    <p className="errorMsg">{error}</p>
                    <input type="text" placeholder="Digite seu nome" autoFocus required
                    value={name} onChange={(e) => setName(e.target.value)}/>
                    <label>Sobrenome</label>
                    <input type="text" placeholder="Digite seu nome" autoFocus required
                    value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <div className="btnContainer">
                        <button type="submit">Entrar</button>
                    </div>
                </form>                         
            </div>
        </section>
    )
}

export default Login;