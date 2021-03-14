import React, { useState } from "react"
import Login from "./Login"
import { Link, Redirect, useHistory } from "react-router-dom"
import {useAuth} from "../contexts/AutenticaContext"
import Bootstrap, { Button, Container } from "react-bootstrap"


const Dashboard = () => {
    const [message, setMessage] = useState()
    const [uid, setUid] = useState()
    const history = useHistory()
    const {sendMessage,logout, currentUser} = useAuth()

    function submitMessage(){
        sendMessage(message,uid)
    }

    function handleLogout(){
        logout()
        history.push("/")
    }

    function checkUser(){
        if(currentUser == null){
            console.log(currentUser)
            return false
        } 
        console.log(currentUser)
        return true
            

        
    }
    
    return(
        <section className="main">
            <nav>
                <h2>APU</h2>
                <div className="btnContainerNav">
                    <Link to="/"><button>Voltar para a página inicial</button></Link>
                    <button onClick= {handleLogout}>Logout</button>
                </div>
            </nav> 

            {checkUser() ? (
                    <Container style={{marginTop: 50, marginLeft: 0, borderStyle: "solid"}}>
                        <input type="text" value = {message} onChange={(e) => setMessage(e.target.value)}/>
                        <input type="text" value = {uid} onChange={(e) => setUid(e.target.value)}/>
                        <button onClick={submitMessage}/>
                    </Container>
                   
                    ) : (
                        <Redirect to="/"/>
                    )}

        </section>
    
     
  
   
        

        
        

    )
}

export default Dashboard;