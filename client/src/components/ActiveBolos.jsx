import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../config/config';
import Cookies from 'js-cookie';

export default class ActiveBolos extends Component {
  constructor() {
    super();

    this.state = {
      bolos: [],
    };
  }

  getBolos = () => {
    Axios({
      url: backendURL + '/global/bolos',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          bolos: res.data.bolos,
        });
      })
      .catch((err) => console.log(err));
  };

  removeBolo = (id) => {
    Axios({
      url: backendURL + '/global/bolos/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.msg === 'Deleted Bolo') {
        sessionStorage.setItem('dispatch-message', 'Successfully Deleted BOLO');
        return (window.location = '/dispatch');
      }
    });
  };

  componentDidMount() {
    this.getBolos();
  }

  render() {
    const { bolos } = this.state;
    return (
      <ul className='list-group mt-3 scroll-bar overflow-auto' style={{maxHeight:"25rem"}}>
        <div className='list-group-item bg-secondary border-secondary'>
          Active Bolos
        </div>
        {!bolos[0] ? (
          <li className='list-group-item bg-dark border-dark text-light'>
            There are no active bolos
          </li>
        ) : (
          bolos.map((bolo, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-dark text-light d-flex justify-content-between'>
                <div className='d-flex'>
                  {++index} | &nbsp;
                  {bolo.type === 'person' ? (
                    <p>
                      {bolo.description} <br />
                      <span className='font-weight-bold'>Name: </span>
                      {bolo.name}
                    </p>
                  ) : (
                    <p>
                      {bolo.description} <br />
                      <span className='font-weight-bold'>Plate: </span>
                      {bolo.plate}
                      <br />
                      <span className='font-weight-bold'>Color: </span>
                      {bolo.color}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.removeBolo(bolo.id);
                    }}
                    className='btn btn-danger'>
                    Remove Bolo
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}
