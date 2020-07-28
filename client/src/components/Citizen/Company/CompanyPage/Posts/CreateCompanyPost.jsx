import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../../Partials/Messages/ErrorMessage';
import lang from '../../../../../language.json';

export default class CreateCompanyPost extends Component {
  constructor() {
    super();

    this.state = {
      companyPostTitle: '',
      companyPostDescription: '',
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const url = `${backendURL}/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/create-post`;

    Axios({
      url: url,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        title: this.state.companyPostTitle,
        description: this.state.companyPostDescription,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Created') {
          sessionStorage.setItem(
            'company-message',
            lang.citizen.company.created_post
          );
          return (window.location = `/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/`);
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Create Company Post - Company';
  }

  render() {
    const { companyPostTitle, companyPostDescription, error } = this.state;
    return (
      <div className='container mt-3 text-light'>
        <form onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} /> : null}
          <div className='form-group'>
            <label htmlFor='companyPostTitle'>
              {lang.citizen.company.post_title}
            </label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='companyPostTitle'
              id='companyPostTitle'
              onChange={this.onChange}
              value={companyPostTitle}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='companyPostTitle'>
              {lang.citizen.company.post_desc}
            </label>
            <textarea
              rows='7'
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='companyPostDescription'
              id='companyPostDescription'
              onChange={this.onChange}
              value={companyPostDescription}></textarea>
          </div>
          <div className='form-group float-right'>
            <a
              className='btn btn-danger mr-2'
              href={`/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/`}>
              {lang.global.cancel}
            </a>
            <button className='btn btn-primary' type='submit'>
              {lang.citizen.company.create_post}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
