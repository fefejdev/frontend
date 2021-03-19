import React, { useEffect } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import './App.css';
import LoginVoluntario from "./LoginVoluntario"
import RegistroVoluntario from "./RegistroVoluntario"
import HomePage from "./HomePage"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useDispatch, useSelector } from "react-redux";
import { isUserLogged } from "../dispatches/Authentication";

const App = () => {

  const authenticator = useSelector(state => state.authentication)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!authenticator.userLogged){
        dispatch(isUserLogged())
    }
  }, [])
  return (
    <Router>
        <Switch> 
          <Route path="/dashboard" component={Dashboard}/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={Login}/>
          <Route path="/loginVoluntario" component={LoginVoluntario}/>
          <Route path="/registroVoluntario" component={RegistroVoluntario}/>
        </Switch>
    </Router>    
  );
}

export default App;