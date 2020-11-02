import React, {useState, useEffect} from "react"
import fb from "./fb"
import Login from "./Login"
import Main from "./Main"
import Dashboard from "./Dashboard"
import {BrowserRouter as Router} from "react-router-dom"
import './App.css';

const App = () => {
  const [usuario, defUsuario] = useState(''); // todas variaveis serão definidas como vazias
  const [email, defEmail] = useState('');
  const [senha, defSenha] = useState('');
  const [erroEmail, defErroEmail] = useState('');
  const [erroSenha, defErroSenha] = useState('');
  const [temConta, defTemConta] = useState(false)

  const limpaMemErros = () =>{
      defErroSenha("")
      defErroEmail("")
  }

  const limpaMemEntrada = () =>{
    defEmail("")
    defSenha("")
}

  const controleLogin = () =>{
    limpaMemErros();
    fb.auth().signInWithEmailAndPassword(email, senha)
    .catch((err) =>{
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          defErroEmail(err.message)
          break;
        case "auth/wrong-password":
          defErroSenha(err.message)
          break;
      }
    });
  }

  const controleRegistro = () =>{
    limpaMemErros();
    fb.auth().createUserWithEmailAndPassword(email,senha)
      .catch((err) =>{
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          defErroEmail(err.message)
          break;
        case "auth/weak-password":
          defErroSenha(err.message)
          break;
      }
    });
  }

  const controleLogout = () =>{
    fb.auth().signOut();
  }

  const autenticaListener = () =>{
    fb.auth().onAuthStateChanged((usuario) => {
      if(usuario){
        limpaMemEntrada();
        defUsuario(usuario)
      }else{
        defUsuario("")
      }
    })
  }

  useEffect(() =>{
    autenticaListener();
  },[autenticaListener])
  return (
    <div className="App">
      {usuario ? (
        <Main controleLogout={controleLogout}/>
      ):(
        <Login email={email} defEmail={defEmail} senha={senha} defSenha={defSenha}
      controleLogin={controleLogin} controleRegistro={controleRegistro}
      temConta={temConta} defTemConta={defTemConta}
      erroEmail={erroEmail} erroSenha={erroSenha}
      />
      )
      }
      
    </div>
  );
}

export default App;
