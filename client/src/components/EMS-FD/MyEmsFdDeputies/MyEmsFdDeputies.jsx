import React, { Component } from 'react';
import MyDeputiesList from './MyDeputiesList';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import lang from '../../../language.json';

export default class MyEmsFdDeputies extends Component {
  render() {
    const message = sessionStorage.getItem('ems-fd-message');
    return (
      <div className='container mt-2'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h4 className='card-title mt-3 text-light'>
          {lang.ems_fd.my_deputies}
        </h4>

        <ul className='list-group'>
          <a href='/ems-fd' className='btn btn-primary mt-1'>
            {lang.ems_fd.ems_dash}
          </a>
          <a
            href='/ems-fd/deputies/create-deputy'
            className='btn btn-primary mt-1'>
            {lang.ems_fd.create_a_dept}
          </a>

          <MyDeputiesList />
        </ul>
      </div>
    );
  }
}
