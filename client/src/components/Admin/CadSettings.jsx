import React, { Component } from 'react';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import { connect } from 'react-redux';
import {
  getCadSettings,
  updateCadSettings,
} from '../../actions/cadSettingsActions';
import { setMessage } from '../../actions/messageActions';
import lang from "../../language.json"

class CadSettings extends Component {
  constructor() {
    super();

    this.state = {
      cad_name: '',
      AOP: '',
      whitelisted: '',
      tow_whitelisted: '',
      company_whitelisted: '',
      error: '',
    };
  }

  getSettings = () => {
    this.props.getCadSettings();

    setTimeout(() => {
      this.setState({
        cad_name: this.props.settings.cad_name,
        AOP: this.props.settings.AOP,
        whitelisted: this.props.settings.whitelisted,
        tow_whitelisted: this.props.settings.tow_whitelisted,
        company_whitelisted: this.props.settings.company_whitelisted,
      });
    }, 200);
  };

  componentDidMount() {
    this.getSettings();
    document.title = 'CAD Settings - Admin';

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newSettings = {
      cadName: this.state.cad_name,
      newAop: this.state.AOP,
      whitelist: this.state.whitelisted,
      towWhitelist: this.state.tow_whitelisted,
      companyWhitelisted: this.state.company_whitelisted,
    };

    this.props.updateCadSettings(newSettings);
    this.props.setMessage('Successfully Updated CAD Settings');

    setTimeout(() => this.props.getCadSettings(), 200);
  };

  componentDidUpdate() {}

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      cad_name,
      AOP,
      whitelisted,
      tow_whitelisted,
      company_whitelisted,
    } = this.state;

    const { message } = this.props;

    return (
      <div className='col text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h3>{lang.admin.cad_settings.cad_settings}</h3>

        <div className='card bg-dark border-dark mt-3'>
          <h4 className='card-header'>{lang.admin.cad_settings.downloads}</h4>
          <div className='card-body'>
            <a
              download
              href='/downloads/snailyCAD-towservice.zip'
              className='ml-2 mb-2 mr-2 btn btn-primary'>
              FiveM call tow service integration (/calltow)
            </a>
            <a
              download
              href='/downloads/snailyCAD-911service.zip'
              className='ml-2 mb-2 mr-2 btn btn-primary'>
              FiveM call 911 service integration (/call911)
            </a>
          </div>
        </div>

        <div className='card bg-dark border-dark mt-3'>
          <h4 className='card-header'>{lang.admin.cad_settings.general_info}</h4>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='cad_name'>{lang.admin.cad_settings.cad_name}</label>
                <input
                  className='form-control bg-secondary border-secondary text-light'
                  type='text'
                  name='cad_name'
                  id='cad_name'
                  value={cad_name}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='AOP'>{lang.admin.cad_settings.update_aop}</label>
                <input
                  className='form-control bg-secondary border-secondary text-light'
                  type='text'
                  name='AOP'
                  id='AOP'
                  value={AOP}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='whitelisted'>{lang.admin.cad_settings.cad_wl}</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='whitelisted'
                  id='whitelisted'
                  onChange={this.onChange}>
                  <option
                    value={
                      whitelisted
                        ? lang.global.yes
                        : lang.global.no
                    }>
                    {whitelisted === 'true'
                      ? lang.global.yes
                      : lang.global.no}
                  </option>
                  <option disabled>--------</option>
                  <option value='true'>{lang.global.yes}</option>
                  <option value='false'>{lang.global.no}</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='tow_whitelisted'>{lang.admin.cad_settings.tow_wl}</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='tow_whitelisted'
                  id='tow_whitelisted'
                  onChange={this.onChange}>
                  <option
                    value={
                      tow_whitelisted === "true"
                        ? lang.global.yes
                        : lang.global.no
                    }>
                    {tow_whitelisted === "true"
                      ? lang.global.yes
                      : lang.global.no}
                  </option>
                  <option disabled>--------</option>
                  <option value='true'>{lang.global.yes}</option>
                  <option value='false'>{lang.global.no}</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='company_whitelisted'>{lang.admin.cad_settings.company_wl}</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='company_whitelisted'
                  id='company_whitelisted'
                  onChange={this.onChange}>
                  <option value={company_whitelisted}>
                    {company_whitelisted}
                  </option>
                  <option disabled>--------</option>
                  <option value='true'>{lang.global.yes}</option>
                  <option value='false'>{lang.global.no}</option>
                </select>
                <small>
                  If selected true, Only moderators and above are able to create
                  companies (Not citizens)
                </small>
              </div>
              <div className='form-group'>
                <button className='btn btn-primary col' type='submit'>
                  {lang.admin.cad_settings.update_cad}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.cad.settings,
  message: state.message.content,
});

export default connect(mapStateToProps, {
  setMessage,
  getCadSettings,
  updateCadSettings,
})(CadSettings);
