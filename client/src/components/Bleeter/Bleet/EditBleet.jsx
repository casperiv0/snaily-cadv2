import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';

export default class EditBleet extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      bleet: '',
      loading: true,
      image: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFileChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  getBleetInfo = () => {
    axios({
      url: backendURL + '/bleeter/edit/' + this.props.match.params.bleetId,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        title: res.data.bleet[0].title,
        bleet: res.data.bleet[0].description,
        loading: false,
      });
      document.title = 'Editing Bleet: ' + res.data.bleet[0].title;
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const url = `${backendURL}/bleeter/edit/${this.props.match.params.bleetId}`;
    const fd = new FormData();
    if (this.state.image) {
      fd.append('image', this.state.image, this.state.image.name);
    }
    fd.append('title', this.state.title);
    fd.append('description', this.state.bleet);

    axios
      .put(url, fd, {
        headers: {
          'x-auth-snailycad-token': Cookies.get('__session'),
        },
      })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'bleeter-message',
            'Successfully Created bleet!'
          );
          window.location = '/bleet/' + this.props.match.params.bleetId;
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getBleetInfo();
  }

  render() {
    const { title, bleet, loading } = this.state;
    if (loading) {
      return <LoadingArea />;
    }
    return (
      <div className='container text-light mt-3'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Image (Not Required)</label>
            <input
              type='file'
              name='image'
              id='image'
              className='form-control-file text-light'
              onChange={this.onFileChange}
            />
            <small>If none selected this will NOT overwrite your old image</small>
          </div>
          <div className='form-group'>
            <label htmlFor='title'>Enter Title</label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='title'
              id='title'
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='title'>Enter Bleet</label>
            <textarea
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='bleet'
              id='bleet'
              onChange={this.onChange}
              value={bleet}
              rows='20'></textarea>
          </div>
          <div className="form-group float-right">
              <a className="btn btn-danger mr-2" href={"/bleet/"+this.props.match.params.bleetId}>Cancel</a>
              <button className="btn btn-primary" type="submit">Update Bleet</button>
          </div>
        </form>
      </div>
    );
  }
}
