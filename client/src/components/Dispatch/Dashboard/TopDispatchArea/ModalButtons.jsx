import React, { Component } from 'react';
import lang from '../../../../language.json';

export default class ModalButtons extends Component {
  render() {
    return (
      <div className='card-body grid'>
        {/* Name Search Buttons */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#nameSearchModal'
          data-toggle='modal'>
          {lang.global.name_search} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/name_search.png'
            alt='name'
          />
        </button>

        {/* Plate Search */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#plateSearchModal'
          data-toggle='modal'>
          {lang.global.plate_search} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Plate_search.png'
            alt='plate'
          />
        </button>

        {/* Weapon Search */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#weaponSearchModal'
          data-toggle='modal'>
          {lang.global.weapon_search} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/weapon.png'
            alt='weapon'
          />
        </button>

        {/* Address Search */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#addressSearchModal'
          data-toggle='modal'>
          {lang.global.address_search} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Adress_Search.png'
            alt='weapon'
          />
        </button>

        {/* Create Bolo */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createBoloModal'
          data-toggle='modal'>
          {lang.global.create_bolo} |{' '}
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
          {lang.global.create_911_call} |{' '}
          <img
            style={{ width: '20px' }}
            src='/icons/internal/call.png'
            alt='weapon'
          />
        </button>

        {/* Notepad */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#notepad'
          data-toggle='modal'>
          {lang.global.notepad} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Notepad.png'
            alt='notepad'
          />
        </button>
      </div>
    );
  }
}
