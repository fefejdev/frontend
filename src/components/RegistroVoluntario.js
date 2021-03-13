import React, {useRef} from 'react'
import fb from '../fb';

export default function RegistroVoluntario() {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleRegister(){

    }
    
    return (
                        <>
                        <section className="login"></section>
                            <div className="loginContainer"></div>
                                <h1>Login - Voluntário</h1>
                                <form onSubmit={handleRegister}>
                                    <label>E-mail</label>
                                    <input type="text" placeholder = "Digite seu email" autoFocus required
                                    ref={emailRef}
                                    />
                                    <label>Senha</label>
                                    <input type="password" placeholder = "Digite sua senha" autoFocus required
                                    ref={passwordRef}
                                    />
                                    <div className="btnContainer">
                                        <button type="submit">Entrar</button>
                                        <p>Registre-se aqui</p>
                                    </div>
                                </form>
                        </>
         
    )
}
