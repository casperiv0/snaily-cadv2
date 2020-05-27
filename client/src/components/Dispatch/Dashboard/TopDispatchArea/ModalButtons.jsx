import React, { Component } from 'react';

export default class ModalButtons extends Component {
  render() {
    return (
      <div className='card-body grid'>
        {/* Name Search Buttons */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#nameSearch'
          data-toggle='modal'>
          Name Search |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/name_search.png'
            alt='name'
          />
        </button>

        {/* Plate Search */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#plateSearch'
          data-toggle='modal'>
          Plate Search |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Plate_search.png'
            alt='plate'
          />
        </button>

        {/* Weapon Search */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#weaponSearch'
          data-toggle='modal'>
          Weapon Search |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/weapon.png'
            alt='weapon'
          />
        </button>

        {/* Address Search */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#addressSearch'
          data-toggle='modal'>
          Address Search |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Adress_Search.png'
            alt='weapon'
          />
        </button>

        {/* Create Bolo */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createBolo'
          data-toggle='modal'>
          Create Bolo |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/bolo.png'
            alt='weapon'
          />
        </button>

        {/* Create 911 Call */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#call911'
          data-toggle='modal'>
          Create 911 Call |{' '}
          <img
            style={{ width: '20px' }}
            src='/icons/internal/call.png'
            alt='weapon'
          />
        </button>

        {/* Notepad */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createBoloModal'
          data-toggle='modal'>
          Create Bolo |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/notepad.png'
            alt='weapon'
          />
        </button>
      </div>
    );
  }
}
