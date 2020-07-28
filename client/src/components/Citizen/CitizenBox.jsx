import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lang from "../../language.json"

export default class CitizenBox extends Component {
  render() {
    const { fullName, id} = this.props;
    return (
      <div className='list-group-item bg-dark border-secondary text-light'>
          {fullName}

          <div className="float-right">
              <Link to={"/citizen/"+id} className="btn btn-primary">{lang.citizen.more_info}</Link>
          </div>
      </div>
    );
  }
}
