import React, { Component } from 'react';
import lang from "../../language.json"

export default class BleetBox extends Component {
  render() {
    const { title, bleet, id, pinned } = this.props;
    return (
      <div
        className={pinned === "true" ? 'card bg-danger border-danger text-light mt-2' :'card bg-dark border-secondary text-light mt-2'  }
        style={{ minHeight: '5rem' }}>
        <div className='card-header d-flex justify-content-between'>
          {title}
          <div>
          <a className='btn btn-primary' href={'/bleet/' + id}>
            {lang.bleeter.view_bleet}
          </a>
          </div>
        </div>

        <div className='card-body'>
          {bleet.length > 120
            ? bleet.split('').slice(0, 120).join('') + '...'
            : bleet}
        </div>
      </div>
    );
  }
}
