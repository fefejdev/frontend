import React from "react"
import Login from "./Login"
import {AuthProvider} from '../contexts/AutenticaContext'
import Dashboard from "./Dashboard"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import './App.css';
import LoginVoluntario from "./LoginVoluntario"
import RegistroVoluntario from "./RegistroVoluntario"
import HomePage from "./HomePage"
import 'bootstrap/dist/css/bootstrap.min.css'; 
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch> 
          <Route path="/dashboard" component={Dashboard}/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={Login}/>
          <Route path="/loginVoluntario" component={LoginVoluntario}/>
          <Route path="/registroVoluntario" component={RegistroVoluntario}/>
        </Switch>
      </AuthProvider>
    </Router>    
  );
}

export default App;
