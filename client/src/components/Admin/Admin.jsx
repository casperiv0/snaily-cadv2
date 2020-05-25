import React, { Component } from 'react';
import CadInformation from "./CadInformation"

export default class Admin extends Component {

  componentDidMount() {
    document.title = "Admin"
  }
  render() {
    return (
      <div className="col">
          <CadInformation />
      </div>
    );
  }
}
