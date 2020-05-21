import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Partials
import Navbar from "./components/Partials/Navbar"

// Authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { getSession } from "./components/Auth/getSession";
import PrivateRoute from "./components/Auth/PrivateRoute"


// Citizen
import CitizensPage from "./components/Citizen/CitizensPage";


export default class Routes extends Component {
    render() {
        return (
            <div>
                <Navbar />


                <Router basename="/">
                    {/* Auth Routes */}
                    <div className="login-container">
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/auth/register" exact component={Register} />
                    </div>
                </Router>


                <Router basename="/" className="container">
                    <PrivateRoute path="/citizen" component={CitizensPage} />
                </Router>

                {/* <Router basename="/">
                    <Route exact path="/citizen" component={CitizensPage} />
                </Router> */}

            </div>
        )
    }
}



const Home = () => {
    return (
        <div className="container">SnailyCAD v2 | Pre-Alpha <br />
            <a href="/auth/login">Login Page</a>
        </div>
    )
}