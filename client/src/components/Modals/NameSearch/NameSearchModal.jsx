import React, { Component } from 'react';
import NamSearchResults from './NamSearchResults';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';

export default class NameSearchModal extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      tickets: [],
      warnings: [],
      arrestReports: [],
      generalInfo: [],
      warrants: [],
      notFound: false
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    if (this.props.name) {
      this.setState({
        name: this.props.name,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/officers/search/name/' + this.state.name,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.citizen) {
        this.setState({
          generalInfo: res.data.citizen[0],
          warrants: res.data.warrants,
          tickets: res.data.tickets,
          arrestReports: res.data.arrestReports,
          warnings: res.data.writtenWarnings,
          registeredWeapons: res.data.weapons,
          registeredVehicles: res.data.vehicles,
          notFound: false
        });
      } else {
        this.setState({
          notFound: true,
          generalInfo: [],
          warrants: [],
          tickets: [],
          arrestReports: [],
          warnings: [],
          registeredWeapons: [],
          registeredVehicles: [],
        })
      }
    });
  };

  render() {
    const {
      name,
      tickets,
      arrestReports,
      warnings,
      generalInfo,
      warrants,
      notFound,
      registeredVehicles,
      registeredWeapons
    } = this.state;
    return (
      <div
        className='modal fade'
        id='nameSearchModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Name Search
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='name'>Enter Citizen Name</label>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={this.onChange}
                    className='form-control bg-secondary border-secondary text-light'
                  />
                </div>
                {notFound ? <ErrorMessage message="No Citizen Found With That Name" /> : null}
                {!generalInfo.full_name ? null : (
                  <NamSearchResults
                    generalInfo={generalInfo}
                    tickets={tickets}
                    arrestReports={arrestReports}
                    warnings={warnings}
                    warrants={warrants}
                    registeredVehicles={registeredVehicles}
                    registeredWeapons={registeredWeapons}
                  />
                )}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
