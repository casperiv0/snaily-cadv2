import React, { Component } from 'react';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import AdminSuccessMessage from '../../AdminSuccessMessage';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';

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
          sessionStorage.setItem(
            'admin-message',
            'Successfully Accepted Member'
          );
          return window.location = "/admin/manage/members"
        }
      })
      .catch((err) => console.log(err));
  };

  declineUser = (memberId) => {
    console.log(memberId);
    
    Axios({
      url: backendURL + '/admin/members/decline/' + memberId,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'User Declined') {
          sessionStorage.setItem(
            'admin-message',
            'Successfully Declined Member, Removing Account..'
          );
          return window.location = "/admin/manage/members";
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { pendingMembers } = this.props;

    return (
      <div className='mt-2'>
        <h3>Pending Members</h3>

        <ul className='list-group'>
          {!pendingMembers[0] ? (
            <ErrorMessage message="There're no pending members " />
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
                      Accept User
                    </button>
                    <button
                      className='btn btn-danger ml-2'
                      type='button'
                      onClick={() => {
                        this.declineUser(member.id);
                      }}>
                      Decline User
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
