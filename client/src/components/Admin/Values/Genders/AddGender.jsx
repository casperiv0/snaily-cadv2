import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';


export default class AddGender extends Component {
  constructor() {
    super();

    this.state = {
      gender: '',
      error: ""
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/genders/add',
      method: "POST",
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        gender: this.state.gender,
      },
    })
    .then(res => {
        if (res.data.msg === "Added") {
            sessionStorage.setItem("admin-message", "Successfully Added Gender");
            return window.location = "/admin/genders";
        }

        this.setState({
            error: res.data.msg
        })
    })
    .catch(err => console.log(err));
  };

  onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  componentDidMount() {
      document.title = "Add Gender - Admin"
  }

  render() {
    const { gender, error } = this.state;
    return (
      <form className="col-md-9 container text-light" onSubmit={this.onSubmit}>
        {
            error ? <ErrorMessage message={error} /> : null
        }

        <div className='form-group'>
          <label htmlFor='gender'>Enter Gender Name</label>
          <input
            type='text'
            name='gender'
            id='gender'
            className="form-control bg-dark border-dark text-light"
            value={gender}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group float-right">
            <a href="/admin/genders" className="btn btn-danger">Cancel</a>
            <button className="btn btn-primary ml-2" type="submit">Add Gender</button>
        </div>
      </form>
    );
  }
}
