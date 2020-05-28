import React, { Component } from 'react';

export default class BleetBox extends Component {
  render() {
    const { title, bleet, id } = this.props;
    return (
      <div className='card bg-dark border-secondary text-light mt-2' style={{ minHeight: '5rem' }}>
        <div className='card-header d-flex justify-content-between'> {title} <a className="btn btn-primary" href={"/bleet/"+id}>View Bleet</a> </div>

        <div className="card-body">
          {bleet.split("").slice(0, 120).join("")+"..." }
        </div>
      </div>
    );
  }
}
