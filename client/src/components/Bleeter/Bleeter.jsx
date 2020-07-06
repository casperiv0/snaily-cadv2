import React, { Component } from 'react';
import BleetBox from './BleetBox';
import LoadingArea from '../Partials/LoadingArea';
import { handleRequest } from '../../functions';

export default class Bleeter extends Component {
  constructor() {
    super();

    this.state = {
      bleets: [],
      loading: true,
    };
  }

  getBleets = () => {
    handleRequest('/bleeter', 'GET')
      .then((res) => {
        this.setState({
          bleets: res.data.bleets,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getBleets();
    document.title = 'Bleeter - View & Create Bleets';
  }

  render() {
    const { bleets, loading } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='container text-light'>
        <div className='pb-3 d-flex justify-content-between'>
          <h3>Bleeter</h3>
          <a href='/bleeter/create' className='btn btn-primary'>
            Create Bleet
          </a>
        </div>
        {!bleets[0] ? (
          <h5>No bleets found</h5>
        ) : (
          bleets.map((bleet, index) => (
            <BleetBox
              key={index}
              id={bleet.id}
              title={bleet.title}
              bleet={bleet.description}
              pinned={bleet.pinned}
            />
          ))
        )}{' '}
      </div>
    );
  }
}
