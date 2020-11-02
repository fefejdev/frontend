import React from "react"

const Login = (props) =>{
    const {email, defEmail, senha, defSenha, controleLogin, controleRegistro, temConta, defTemConta, erroEmail, erroSenha} = props;
    return(
        <section className="login">
            <div className="loginContainer">
                <label>E-mail</label>
                <input type="text" placeholder = "Digite seu email" autoFocus required
                value = {email} onChange={(e) => defEmail(e.target.value)}
                />
                <p className="errorMsg">{erroEmail}</p>

                <label>Senha</label>
                <input type="password" placeholder = "Digite sua senha" autoFocus required
                value = {senha} onChange={(e) => defSenha(e.target.value)}
                />
                <p className="errorMsg">{erroSenha}</p>

                <div className="btnContainer">
                    {temConta ? (
                        <>
                            <button onClick={controleLogin}>Entrar</button>
                            <p>Registre-se <span onClick={() => defTemConta(!temConta)}>aqui</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={controleRegistro}>Registrar</button>
                            <p>Faça login<span onClick={() => defTemConta(!temConta)}>aqui</span></p>
                        </>
                    )
                    }
                </div>
            </div>
        </section>
    );
}

export default Login;