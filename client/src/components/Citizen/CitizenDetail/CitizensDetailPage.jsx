import React, { Component } from 'react';
import GeneralInformation from './GeneralInformation';
import LicensesBox from '../Licenses/LicensesBox';
import LoadingArea from '../../Partials/LoadingArea';
import MedicalRecordsBox from '../Medical/MedicalRecordsBox';
import RegisteredVehicles from '../Vehicles/RegisteredVehicles';
import RegisteredWeapons from '../Weapons/RegisteredWeapons';
import { getCitizenById } from '../../../actions/citizenActions';
import { connect } from 'react-redux';

class CitizensDetailPage extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const citizenId = this.props.match.params.citizenId;
    this.props.getCitizenById(citizenId);

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      document.title = `Viewing ${this.props.citizen.full_name}`;
    }, 100);
  }

  render() {
    const { loading } = this.state;
    const citizen = this.props.citizen;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='container-fluid mt-2 pb-5'>
        {/* Main Info Box */}
        <GeneralInformation
          fullName={citizen.full_name}
          birth={citizen.birth}
          gender={citizen.gender}
          ethnicity={citizen.ethnicity}
          hairColor={citizen.hair_color}
          eyeColor={citizen.eye_color}
          address={citizen.address}
          height={citizen.height}
          weight={citizen.weight}
          employer={citizen.business}
          id={citizen.id}
          picture={citizen.citizen_picture}
        />

        <LicensesBox
          citizenId={citizen.id}
          dmv={citizen.dmv}
          ccw={citizen.ccw}
          firearmsLicense={citizen.fire_license}
          pilotLicense={citizen.pilot_license}
        />

        {/* Medical Records */}
        <MedicalRecordsBox
          citizenId={citizen.id}
          fullName={citizen.full_name}
        />

        {/* Vehicles, Weapons, Ticket & Arrest reports */}
        <ul className='list-group'>
          <RegisteredVehicles citizenId={citizen.id} />
          <RegisteredWeapons citizenId={citizen.id} />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  citizen: state.citizens.citizen,
});

export default connect(mapStateToProps, { getCitizenById })(CitizensDetailPage);
