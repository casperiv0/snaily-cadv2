import React, { Component } from 'react';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import lang from '../../../../language.json';

export default class PendingMembers extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      pendingMembers: [],
    };
  }

  componentDidMount() {
    this.props.getPendingMembers();
  }

  acceptUser = (memberId) => {
    Axios({
      url: backendURL + '/admin/members/accept/' + memberId,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'User Accepted') {
          sessionStorage.setItem('admin-message', lang.admin.accepted_member);
          return (window.location = '/admin/manage/members');
        }
      })
      .catch((err) => console.log(err));
  };

  declineUser = (memberId) => {
    Axios({
      url: backendURL + '/admin/members/decline/' + memberId,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'User Declined') {
          sessionStorage.setItem('admin-message', lang.admin.declined_member);
          return (window.location = '/admin/manage/members');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { pendingMembers } = this.props;

    return (
      <div className='mt-2'>
        <h3>{lang.admin.pending_members}</h3>

        <ul className='list-group'>
          {!pendingMembers[0] ? (
            <ErrorMessage message={lang.admin.no_pending} />
          ) : (
            pendingMembers.map((member, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                  <div>
                    <span className='font-weight-bold'>
                      {++index} | {member.username}
                    </span>
                  </div>
                  <div>
                    <button
                      className='btn btn-success'
                      type='button'
                      onClick={() => {
                        this.acceptUser(member.id);
                      }}>
                      {lang.global.accept}
                    </button>
                    <button
                      className='btn btn-danger ml-2'
                      type='button'
                      onClick={() => {
                        this.declineUser(member.id);
                      }}>
                      {lang.global.decline}
                    </button>
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
