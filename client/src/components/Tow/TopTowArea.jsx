import React, { Component } from 'react';

export default class TopTowArea extends Component {
  render() {
    const { children } = this.props;
    return (
      <ul className='list-group'>
        <div className='list-group-item active'>
          <p>Active Calls</p>
        </div>
        {children}
      </ul>
    );
  }
}
