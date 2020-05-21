import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Partials
import Navbar from "./components/Partials/Navbar"

// Authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from "./components/Auth/PrivateRoute"


// Citizen
import CitizensPage from "./components/Citizen/CitizensPage";
import HomePage from './components/Partials/HomePage';


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
                    <PrivateRoute path="/citizen" component={CitizensPage} />
                </Switch>

                {/* <Router basename="/">
                    <Route exact path="/citizen" component={CitizensPage} />
                </Router> */}

            </Router>
        )
    }
}