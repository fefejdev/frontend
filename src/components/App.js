import React, {useState, useEffect} from "react"
import fb from "../fb"
import Login from "./Login"
import {AuthProvider} from '../contexts/AutenticaContext'
import Dashboard from "./Dashboard"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import './App.css';
import LoginVoluntario from "./LoginVoluntario"
import RegistroVoluntario from "./RegistroVoluntario"

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/loginVoluntario" component={LoginVoluntario}/>
          <Route path="/registroVoluntario" component={RegistroVoluntario}/>
        </Switch>
      </AuthProvider>
    </Router>    
  );
}

export default App;
