import React, { Component } from 'react';
import LoadingArea from '../../../Partials/LoadingArea';
import AllMembersList from './AllMembersList';
import PendingMembers from './PendingMembers';
import Cookies from 'js-cookie';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import lang from '../../../../language.json';

export default class MemberManagement extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('admin-message'),
      pendingMembers: [],
    };
  }

  getPendingMembers = () => {
    Axios({
      url: backendURL + '/admin/members',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Forbidden') {
          return this.setState({
            message: 'Only admins+ are allowed to manage members',
          });
        }

        if (res.data.members) {
          this.setState({
            pendingMembers: res.data.pendingMembers,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Member Management - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { loading, message } = this.state;
    if (loading) {
      return <LoadingArea />;
    }
    return (
      <div className='container col text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <div className='nav nav-tabs' id='nav-tab' role='tablist'>
          <a
            className='nav-item nav-link active bg-dark text-light border-secondary'
            id='nav-home-tab'
            data-toggle='tab'
            href='#members'
            role='tab'
            aria-controls='nav-home'
            aria-selected='true'>
            {lang.admin.all_members}
          </a>
          <a
            className='nav-item nav-link bg-dark text-light border-secondary'
            id='nav-contact-tab'
            data-toggle='tab'
            href='#pending'
            role='tab'
            aria-controls='nav-contact'
            aria-selected='false'>
            {lang.admin.pending_members}
            <div className='badge badge-primary ml-2'>
              {this.state.pendingMembers.length}
            </div>
          </a>
        </div>

        <div className='tab-content' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='members'
            role='tabpanel'
            aria-labelledby='members-tab'>
            <AllMembersList />
          </div>

          <div
            className='tab-pane fade active'
            id='pending'
            role='tabpanel'
            aria-labelledby='pending-tab'>
            <PendingMembers
              getPendingMembers={this.getPendingMembers}
              pendingMembers={this.state.pendingMembers}
            />
          </div>
        </div>
      </div>
    );
  }
}
