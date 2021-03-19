import React, {useState} from 'react'
import {signUp} from '../dispatches/Authentication'
import {Redirect,Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

const RegistroVoluntario = () => {
    const [email,defEmail] = useState();
    const [password,defPassword] = useState();
    const [passwordError, setPassWordError] = useState()
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const dispatch = useDispatch();
    const authenticator = useSelector(state => state.authentication)
    

    const handleRegister = (e) =>{
        e.preventDefault()

        if(password < 6){
            return setPassWordError('A senha deve ser maior que 6 caracteres')
        }
        
        const newUser = {
            firstName: name,
            lastName: lastName,
            email: email,
            password: password,
        }
        
        console.log(newUser)
        dispatch(signUp(newUser))
    }

    if(authenticator.userLoaded){
        return <Redirect to="/dashboard"/>
    }
    
    return (
        <section className="login">
            
            <div className="loginContainer">
                <h1>Registro - Voluntário</h1>
                <form onSubmit={handleRegister}>
                    <label>Nome</label>
                    <input type="text" placeholder="Digite seu nome" autoFocus required
                    value={name} onChange={(e) => setName(e.target.value)}/>
                    <label>Sobrenome</label>
                    <input type="text" placeholder="Digite seu nome" autoFocus required
                    value={lastName} onChange={(e) => setLastName(e.target.value)}/>
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
                        <button type="submit">Registrar</button>
                        <p>Já tem uma conta? Faça seu login<Link to="/loginVoluntario"><span>aqui</span></Link></p>
                    </div>
                </form>
            </div>
</section>
         
    )
}


export default RegistroVoluntario;