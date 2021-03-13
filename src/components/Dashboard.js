import React from "react"
import Login from "./Login"
import { Link } from "react-router-dom"
import {useAuth} from "../contexts/AutenticaContext"


const Dashboard = ({controleLogout}) => {

    const {logout, currentUser} = useAuth()
    return(
    <section className="main">
        <nav>
            <h2>APU</h2>
            <a>About Us</a>
            <p>{currentUser && currentUser.uid}</p>
            <p> {currentUser && currentUser.isAnonymous} </p>
            
                <Link to="/login">Login</Link>
            
            <button onClick= {logout}>Logout</button>
        </nav>
    </section>
    )
}

export default Dashboard;