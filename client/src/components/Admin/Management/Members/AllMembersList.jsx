import React, { Component } from 'react';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import AdminSuccessMessage from '../../AdminSuccessMessage';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../../Partials/LoadingArea';

export default class AllMembersList extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      members: [],
      filteredMembers: [],
      loading: true
    };
  }

  handleSearch = (e) => {
    // Thanks to: https://codepen.io/iamtimsmith/pen/zJPzwN?editors=1010
    let currentList = [];
    let newList = [];

    if (e.target.value === '') {
      newList = this.state.members;
    } else {
      currentList = this.state.members;

      newList = currentList.filter((item) => {
        const lc = item.username.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    }

    this.setState({
      filteredMembers: newList,
    });
  };

  getMembers = () => {
    Axios({
      url: backendURL + '/admin/members',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.members) {
          this.setState({
            members: res.data.members,
            filteredMembers: res.data.members,
            loading: false
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getMembers();
  }

  render() {
    const { filteredMembers, members, message, loading } = this.state;

    if (loading) {
        return <LoadingArea />
    }

    return (
      <div className='mt-2'>
        {message ? <AdminSuccessMessage message={message} /> : null}
        <h3>All Members</h3>
        <div className='form-group'>
          <label htmlFor='search'>Filter member by name</label>
          <input
            className='form-control bg-dark border-secondary text-light'
            type='search'
            name='search'
            id='search'
            onChange={this.handleSearch}
          />
        </div>

        <ul className='list-group'>
          {!members[0] ? (
            <ErrorMessage message='This CAD does not have any members' />
          ) : null}
          {!filteredMembers[0] ? (
            <ErrorMessage message='No members found with that name' />
          ) : (
            filteredMembers.map((member, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                  <div>
                    <span className='font-weight-bold'>
                      {++index} | {member.username}
                    </span>
                    <div
                      className='collapse mt-2'
                      id={'citizenInfo' + member.id}>
                      <span className='font-weight-bold'>Rank:</span>{' '}
                      {member.rank} <br />
                      <span className='font-weight-bold'>
                        Police Access:
                      </span>{' '}
                      {member.leo} <br />
                      <span className='font-weight-bold'>Dispatch Access:</span>{' '}
                      {member.dispatch} <br />
                      <span className='font-weight-bold'>EMS/FD Access:</span>{' '}
                      {member.ems_fd} <br />                      
                      <span className='font-weight-bold'>Tow Access:</span>{' '}
                      {member.tow} <br />
                    </div>
                  </div>
                  <div>
                    <button
                      className='btn btn-primary'
                      type='button'
                      data-toggle='collapse'
                      data-target={'#citizenInfo' + member.id}
                      aria-expanded='false'
                      aria-controls={'citizenInfo' + member.id}>
                      Toggle Info
                    </button>
                    <a className="btn btn-success ml-2" href={"/admin/manage/members/edit/"+member.id}>Manage Permissions</a>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}
