import React, {useState} from "react"
import {useAuth} from '../contexts/AutenticaContext'
import {useHistory} from "react-router-dom"

const LoginVoluntario = () =>{
    const [email, defEmail] = useState()
    const [password, defPassword] = useState()
    const [passwordError, setPassWordError] = useState()
    const [error, setError] = useState()
    const {signIn, currentUser,logout,storeUser} = useAuth()
    const history = useHistory()
    
    

    async function handleLogin(){
        if(password.length < 6){
            return setPassWordError("Senha curta demais")
        }

        try{
            setPassWordError("")
            await signIn(email, password)
            storeUser(currentUser)
            history.push("/")
        } catch{
            setError("Erro ao logar")
        }
    }
    return(
        <section className="login">
            <div className="loginContainer">
                        <h1>Login - Voluntário</h1>
                        <p className="errorMsg">{error}</p>
                        <p className="errorMsg">{currentUser && currentUser.email}</p>
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
                            <button onClick={logout}>Entrar</button>
                            <p>Registre-se aqui</p>
                        </div>
                    
                </div>
        
        </section>
    );
}

export default LoginVoluntario;