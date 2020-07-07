import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import lang from '../../language.json';

export default class CreateBleet extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      bleet: '',
      image: '',
      error: '',
    };
  }

  onFileChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const url = `${backendURL}/bleeter/create`;
    const fd = new FormData();
    if (this.state.image) {
      fd.append('image', this.state.image, this.state.image.name);
    }
    fd.append('title', this.state.title);
    fd.append('bleet', this.state.bleet);

    axios
      .post(url, fd, {
        headers: {
          'x-auth-snailycad-token': Cookies.get('__session'),
        },
      })
      .then((res) => {
        if (res.data.msg === 'Created') {
          sessionStorage.setItem(
            'bleeter-message',
            lang.bleeter.create_bleet_success
          );
          return (window.location = '/bleet/' + res.data.bleetId);
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Create Bleet - Bleeter';
  }

  render() {
    const { title, bleet, error } = this.state;
    return (
      <div className='container mt-3 text-light'>
        {error ? <ErrorMessage message={error} dismiss /> : null}
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>{lang.global.image}</label>
            <input
              type='file'
              name='image'
              id='image'
              className='form-control-file text-light'
              onChange={this.onFileChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='title'>{lang.bleeter.bleet_title}</label>
            <input
              type='text'
              name='title'
              id='title'
              className='form-control bg-secondary border-secondary text-light'
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='bleet'>{lang.bleeter.bleet_body}</label>
            <textarea
              type='text'
              name='bleet'
              id='bleet'
              rows='20'
              className='form-control bg-secondary border-secondary text-light'
              onChange={this.onChange}
              value={bleet}></textarea>
          </div>
          <div className='form-group float-right'>
            <a className='btn btn-danger' href='/bleeter'>
              {lang.global.cancel}
            </a>
            <button type='submit' className='btn btn-primary ml-2'>
              {lang.bleeter.create_bleet}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
