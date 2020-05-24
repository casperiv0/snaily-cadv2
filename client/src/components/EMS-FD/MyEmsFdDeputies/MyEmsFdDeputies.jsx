import React, { Component } from 'react';
import MyDeputiesList  from "./MyDeputiesList"

export default class MyEmsFdDeputies extends Component {
  render() {
    return (
      <div className='container mt-2'>
        <h4 className='card-title mt-3 text-light'>EMS/FD - My Deputies</h4>

        <ul className='list-group'>
          <a href='/ems-fd' className='btn btn-primary mt-1'>
            EMS-FD Dashboard
          </a>
          <a href='/ems-fd/deputies/create-deputy' className='btn btn-primary mt-1'>
            Create EMS Deputy
          </a>

          <MyDeputiesList />
        </ul>
      </div>
    );
  }
}
