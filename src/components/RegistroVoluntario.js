import React, {useRef, useState} from 'react'
import fb from '../fb';
import {useAuth} from '../contexts/AutenticaContext'
import {Redirect, useHistory} from "react-router-dom"

export default function RegistroVoluntario() {
    const [email,defEmail] = useState();
    const [password,defPassword] = useState();
    const [passwordError, setPassWordError] = useState()
    const [error, setError] = useState()
    const {signIn, currentUser,logout} = useAuth()
    const history = useHistory()
    

    function handleRegister(){

    }
    
    return (
        <section className="login">
            
        {currentUser ? (
            <Redirect to="/dashboard"/>
        ) : (
            <div className="loginContainer">
        <h1>Login - Voluntário</h1>
            <p className="errorMsg">{error}</p>
            <label>E-mail</label>
            <input type="email" placeholder = "Digite seu email" autoFocus required
            value = {email} onChange={(e) => defEmail(e.target.value)}
            />
            

            <label>Senha</label>
            <input type="password" placeholder = "Digite sua senha" autoFocus required
            value = {password} onChange={(e) => defPassword(e.target.value)}
            />
            
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
                <button onClick={handleRegister}>Entrar</button>
                
                <p>Registre-se aqui</p>
            </div>
        </div>

        )}
        

</section>
         
    )
}
