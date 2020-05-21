import React, { Component } from 'react';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux"


class App extends Component {
  render() {
    return (
      <Routes />
    )
  }
}



export default App;