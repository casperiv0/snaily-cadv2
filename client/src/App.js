import React, { Component } from 'react';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#343a40", minHeight: "100vh"}}>
        <Routes />
      </div>
    )
  }
}



export default App;