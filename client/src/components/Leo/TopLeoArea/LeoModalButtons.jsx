import React, { Component } from 'react';

export default class LeoModalButtons extends Component {
  render() {
    return (
      <div>
        <a
          href='/leo/myofficers'
          className='btn btn-primary col-md-2 mt-2 ml-1'>
          My Officers
        </a>
        {/* Name Search Buttons */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#nameSearchModal'
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
          data-target='#plateSearchModal'
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
          data-target='#weaponSearchModal'
          data-toggle='modal'>
          Weapon Search |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/weapon.png'
            alt='weapon'
          />
        </button>

        {/* createWarningModal */}
        <button
          className='btn btn-primary col-md-3  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createWarningModal'
          data-toggle='modal'>
          Create Written Warning |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/warning.png'
            alt='weapon'
          />
        </button>

        {/* createTicketModal */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createTicketModal'
          data-toggle='modal'>
          Create Ticket |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Create_Ticket.png'
            alt='weapon'
          />
        </button>

        {/* createArrestReport */}
        <button
          className='btn btn-primary col-md-3  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createArrestReport'
          data-toggle='modal'>
          Create Arrest Report |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/arrest.png'
            alt='weapon'
          />
        </button>

        {/* Create Bolo */}
        <button
          className='btn btn-primary col-md-2  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createBoloModal'
          data-toggle='modal'>
          Create Bolo |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/bolo.png'
            alt='weapon'
          />
        </button>

        {/* Notepad */}
        <button
          className='btn btn-primary  col-md-2 text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#notepad'
          data-toggle='modal'>
          Open Notepad |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/notepad.png'
            alt='notepad'
          />
        </button>
        <a
          href='/leo/penal-codes'
          className='btn btn-secondary col-md-2 mt-2 ml-1'>
          Penal Codes |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Penal_Code.png'
            alt='Penal_Code'
          />
        </a>
        <a
          href='/leo/10-codes'
          className='btn btn-secondary col-md-2 mt-2 ml-1'>
          10 Codes |{' '}
          <img style={{ width: '25px' }} src='/icons/internal/list.png' alt='10codes' />
        </a>
      </div>
    );
  }
}
