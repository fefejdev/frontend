import React, {useState} from "react"
import {signIn} from '../dispatches/Authentication'
import {Redirect,Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const LoginVoluntario = () =>{
    const [email, defEmail] = useState()
    const [password, defPassword] = useState()
    const [passwordError, setPassWordError] = useState()
    const dispatch = useDispatch()
    const authenticator = useSelector(state => state.authentication)
    
    

    const handleLogin = () => {
        if(password.length < 6){
            return setPassWordError("Senha curta demais")
        }

        console.log(email)
        console.log(password)
        const user = {
            email: email,
            password: password
        }
        
        dispatch(signIn(user))
        
    }

    if(authenticator.userLoaded){
        return <Redirect to="/dashboard"/>
    }
    
    return(
        <section className="login">
            
                       
                            <div className="loginContainer">
                        <h1>Login - Voluntário</h1>
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
                                <button onClick={handleLogin}>Entrar</button>
                                <p>Ainda não tem uma conta? Registre-se<Link to="/registroVoluntario"><span>aqui</span></Link></p>
                            </div>
                        </div>
                
                      
                        
        
        </section>
    );
}

export default LoginVoluntario;