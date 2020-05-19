import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Citizen
import CitizensPage from "./components/Citizen/CitizensPage";

class App extends Component {

  constructor() {
    super()

    this.state = {
      token: sessionStorage.getItem("token"),
    };
  };


  render() {
    return (
      <Router>

        {/* Auth Routes */}
        <div className="container">
          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/register" exact component={Register} />
        </div>

          <Route path="/citizen" exact component={CitizensPage} />
      </Router>
    );
  }
}

export default App;
