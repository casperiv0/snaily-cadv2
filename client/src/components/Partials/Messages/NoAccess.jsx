import React, { Component } from 'react';

export default class NoAccess extends Component {
  componentDidMount() {
    document.title = '403 - No Access';
  }

  render() {
    const { message } = this.props;
    return <h1 className='text-center mt-5 text-light'>{message}</h1>;
  }
}