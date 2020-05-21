import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CitizenBox extends Component {
  render() {
    const { fullName } = this.props;
    return (
      <div className='list-group-item bg-secondary border-secondary text-light'>
          {fullName}

          <div className="float-right">
              <Link className="btn btn-primary">More Info</Link>
          </div>
      </div>
    );
  }
}
