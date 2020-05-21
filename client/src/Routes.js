import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Partials
import Navbar from "./components/Partials/Navbar"
import HomePage from './components/Partials/HomePage';

// Authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from "./components/Auth/PrivateRoute"


// Citizen
import CitizensPage from "./components/Citizen/CitizensPage";
import CreateCitizen from "./components/Citizen/CreateCitizen";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Navbar />


                <Switch basename="/">
                    <Route path="/" exact component={HomePage} />
                    {/* Auth Routes */}
                    <div className="login-container">
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/auth/register" exact component={Register} />
                    </div>
                </Switch>


                <Switch basename="/" className="container">
                    <PrivateRoute exact path="/citizen" component={CitizensPage} />
                    <PrivateRoute exact path="/citizen/create" component={CreateCitizen} />
                </Switch>

            </Router>
        )
    }
}