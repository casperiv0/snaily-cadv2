import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../../Partials/LoadingArea';
import CompanyPostsArea from './Posts/CompanyPostsArea';
import lang from "../../../../language.json"

export default class CompanyPage extends Component {
  constructor() {
    super();

    this.state = {
      company: [],
      citizen: [],
      companyPosts: [],
      loading: true,
    };
  }

  getCompanyData = () => {
    const url = `${backendURL}/company/${this.props.match.params.citizenId}/${this.props.match.params.company}`;
    axios({
      url: url,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.msg === 'Not Found') {
        sessionStorage.setItem('message', "This Company Wasn't found.");
        return (window.location = '/citizen');
      }

      if (res.data.msg === 'Forbidden') {
        sessionStorage.setItem(
          'message',
          "You are not allowed to view this company because you're not working here."
        );
        return (window.location = '/citizen');
      }

      if (res.data.msg === 'Pending') {
        sessionStorage.setItem(
          'message',
          'You are still pending access to this company.'
        );
        return (window.location = '/citizen');
      }

      if (res.data.msg === 'Declined') {
        sessionStorage.setItem(
          'message',
          'You were declined for this company.'
        );
        return (window.location = '/citizen');
      }

      if (res.data.company) {
        this.setState({
          citizen: res.data.citizen[0],
          company: res.data.company[0],
          posts: res.data.posts,
          loading: false,
        });

        document.title =
          'Viewing Company: ' + res.data.company[0].business_name;
      }
    });
  };

  componentDidMount() {
    this.getCompanyData();
  }

  render() {
    const { loading, company, posts, citizen } = this.state;

    if (loading) {
      return <LoadingArea />;
    }
    const companyUrl = `/company/${this.props.match.params.citizenId}/${this.props.match.params.company}`;
    return (
      <div className='container text-light mt-3'>
        <div className='d-flex justify-content-between'>
          <h3> {company.business_name} </h3>
          <div>
            <a
              className='btn btn-primary mr-2'
              href={companyUrl + '/create-post'}>
              {lang.citizen.company.create_a_post}
            </a>
            {citizen.rank === 'manager' || citizen.rank === 'owner' ? (
              <a className='btn btn-secondary' href={companyUrl + '/manage'}>
                {lang.citizen.company.manage_company}
              </a>
            ) : null}
          </div>
        </div>

        <CompanyPostsArea posts={posts} />
      </div>
    );
  }
}
