import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import { backendURL } from '../../../../../../config/config';

export default class EditEmployee extends Component {
  constructor() {
    super();

    this.state = {
      employeeRank: '',
      vehicleReg: '',
      posts: '',
      current: [],
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const url = `${backendURL}/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/employees/${this.props.match.params.employeeId}/`;
    Axios({
      url: url,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        rank: this.state.employeeRank,
        vehicle_reg: this.state.vehicleReg,
        posts: this.state.posts,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'company-message',
            'Successfully Updated ' + this.state.current.full_name
          );
          return (window.location = `/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/manage`);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  getCurrentData = () => {
    const url = `${backendURL}/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/employees/${this.props.match.params.employeeId}/`;
    Axios({
      url: url,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.employee) {
        this.setState({
          employeeRank: res.data.employee[0].rank,
          vehicleReg: res.data.employee[0].vehicle_reg,
          posts: res.data.employee[0].posts,
          current: res.data.employee[0],
        });
        document.title = 'Editing Employee: ' + res.data.employee[0].full_name;
      } else {
        console.log(res.data.msg);
      }
    });
  };

  componentDidMount() {
    this.getCurrentData();
  }

  render() {
    const { employeeRank, vehicleReg, current, posts } = this.state;
    let message;

    if (current.rank === 'owner') {
      message = "You can't modify the owners rank!";
    }

    return (
      <div className='container mt-3 text-light'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='employeeRank'>Select Rank</label>
            {message ? (
              <p>{message}</p>
            ) : (
              <select
                className='form-control bg-secondary border-secondary text-light'
                type='text'
                name='employeeRank'
                id='employeeRank'
                value={employeeRank}
                onChange={this.onChange}>
                <option value={current.rank}>{current.rank}</option>
                <option value='--------'>--------</option>
                <option value='manager'>Manager</option>
                <option value='employee'>Employee</option>
              </select>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='vehicleReg'>Can Register Company Vehicles</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='vehicleReg'
              id='vehicleReg'
              value={vehicleReg}
              onChange={this.onChange}>
              <option value={current.vehicle_reg}>{current.vehicle_reg}</option>
              <option value='--------'>--------</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='vehicleReg'>Can Create Company Posts</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='posts'
              id='posts'
              value={posts}
              onChange={this.onChange}>
              <option value={current.posts}>{current.posts}</option>
              <option value='--------'>--------</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>

          <div className='form-group float-right'>
            <a
              className='btn btn-danger'
              href={`/company/${this.props.match.params.citizenId}/${this.props.match.params.company}/manage`}>
              Cancel
            </a>
            <button className='btn btn-primary ml-2' type='submit'>
              Update Employee
            </button>
          </div>
        </form>
      </div>
    );
  }
}
