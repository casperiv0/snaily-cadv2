import React, { Component } from 'react';

export default class BleetBox extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className='card' style={{ height: '5rem' }}>
        <div className='card-header'> {title}</div>
      </div>
    );
  }
}
