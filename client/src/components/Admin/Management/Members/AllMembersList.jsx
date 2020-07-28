import React, { Component } from 'react';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../../Partials/LoadingArea';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import lang from '../../../../language.json';

export default class AllMembersList extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      members: [],
      filteredMembers: [],
      loading: true,
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
            loading: false,
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
      return <LoadingArea />;
    }

    return (
      <div className='mt-2'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h3>{lang.admin.management}</h3>
        <div className='form-group'>
          <label htmlFor='search'>{lang.admin.filter_by_name}</label>
          <input
            className='form-control bg-dark border-secondary text-light'
            type='search'
            name='search'
            id='search'
            onChange={this.handleSearch}
          />
        </div>

        <ul className='list-group'>
          {!members[0] ? <ErrorMessage message={lang.no_members_cad} /> : null}
          {!filteredMembers[0] ? (
            <ErrorMessage message={lang.admin.no_member_found_by_name} />
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
                      id={'memberInfo' + member.id}>
                      <span className='font-weight-bold'>{lang.global.rank}:</span>{' '}
                      {member.rank} <br />
                      <span className='font-weight-bold'>
                        {lang.auth.account.police_access}:
                      </span>{' '}
                      {member.leo} <br />
                      <span className='font-weight-bold'>
                      {lang.auth.account.dispatch_access}:
                      </span>{' '}
                      {member.dispatch} <br />
                      <span className='font-weight-bold'>
                      {lang.auth.account.ems_fd_access}:
                      </span>{' '}
                      {member.ems_fd} <br />
                      <span className='font-weight-bold'>{lang.auth.account.tow_access}:</span>{' '}
                      {member.tow} <br />
                      {/* Ban */}
                      <span className='font-weight-bold'>{lang.auth.account.banned}:</span>{' '}
                      {member.banned} <br />
                      {member.banned === 'true' ? (
                        <div>
                          <span className='font-weight-bold'>{lang.auth.account.ban_reason}:</span>{' '}
                          {member.ban_reason}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <button
                      className='btn btn-primary'
                      type='button'
                      data-toggle='collapse'
                      data-target={'#memberInfo' + member.id}
                      aria-expanded='false'
                      aria-controls={'memberInfo' + member.id}>
                      {lang.admin.toggle_info}
                    </button>
                    <a
                      className='btn btn-success ml-2'
                      href={'/admin/manage/members/edit/' + member.id}>
                      {lang.admin.manage_perms}
                    </a>
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
