import React, { Component } from 'react';
import Cookies from "js-cookie";
import { panicStart } from '../../../actions/otherActions';
import { connect } from 'react-redux';
import lang from "../../../language.json"

class LeoModalButtons extends Component {


  panicStart = () => {
    const officerId = Cookies.get("on-duty-officerId");

    const officer = {
      id: officerId,
      officerName: this.props.officerName
    }

    this.props.panicStart(officer)
  }

  render() {
    return (
      <div>
        <a
          href='/leo/myofficers'
          className='btn btn-primary col-md-2 mt-2 ml-1'>
          {lang.officers.my_officers}
        </a>
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

        {/* createWarningModal */}
        <button
          className='btn btn-primary col-md-3  text-light btn-secondary bg-secondary mt-2 ml-1'
          data-target='#createWarningModal'
          data-toggle='modal'>
          {lang.global.create_written_warning} |{' '}
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
          {lang.global.create_ticket}  |{' '}
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
          {lang.global.create_arrest_report}  |{' '}
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
          {lang.global.create_bolo} |{' '}
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
          {lang.global.notepad} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Notepad.png'
            alt='notepad'
          />
        </button>
        <a
          href='/leo/penal-codes'
          className='btn btn-secondary col-md-2 mt-2 ml-1'>
          {lang.global.penal_codes} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/Penal_Code.png'
            alt='Penal_Code'
          />
        </a>
        <a
          href='/leo/10-codes'
          className='btn btn-secondary col-md-2 mt-2 ml-1'>
          {lang.global.codes_10} |{' '}
          <img
            style={{ width: '25px' }}
            src='/icons/internal/list.png'
            alt='10codes'
          />
        </a>
        <button
          onClick={this.panicStart}
          className='btn btn-danger col-md2 mt-2 ml-1'>
          {lang.global.panic_button} 
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  officerName: state.officer.officerName,
});

export default connect(mapStateToProps, { panicStart })(LeoModalButtons);
