import React, { Component } from 'react';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";

import store from "./store"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ backgroundColor: "#191919", minHeight: "100vh" }}>
          <Routes />
        </div>
      </Provider>
    )
  }
}



export default App;