import React from "react"
import Login from "./Login"
import { Link, Redirect, useHistory } from "react-router-dom"
import {useAuth} from "../contexts/AutenticaContext"
import Bootstrap, { Button, Container } from "react-bootstrap"


const Dashboard = () => {
    const history = useHistory()
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
    const {logout, currentUser} = useAuth()
    return(
        <section className="main">
            <nav>
                <h2>APU</h2>
                <button onClick= {handleLogout}>Logout</button>
            </nav> 

            {checkUser() ? (
                    <Container>
                        <p>Você está logado</p>
                    </Container>
                   
                    ) : (
                        <Redirect to="/"/>
                    )}

        </section>
    
     
  
   
        

        
        

    )
}

export default Dashboard;