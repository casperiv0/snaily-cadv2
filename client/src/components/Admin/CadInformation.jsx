import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import lang from '../../language.json';

export default class CadInformation extends Component {
  constructor() {
    super();

    this.state = {
      users: 0,
      citizens: 0,
      weapons: 0,
      vehicles: 0,
      tickets: 0,
      arrestReports: 0,
      companies: 0,
      companyPosts: 0,
      bolos: 0,
    };
  }

  getAllData = () => {
    Axios({
      url: backendURL + '/admin/',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          users: res.data.users.length,
          citizens: res.data.citizens.length,
          weapons: res.data.weapons.length,
          vehicles: res.data.vehicles.length,
          tickets: res.data.tickets.length,
          arrestReports: res.data.arrestReports.length,
          companies: res.data.companies.length,
          companyPosts: res.data.posts.length,
          bolos: res.data.bolos.length,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getAllData();
  }

  render() {
    const {
      users,
      citizens,
      weapons,
      vehicles,
      arrestReports,
      tickets,
      companies,
      bolos,
    } = this.state;
    return (
      <div className='text-light col-md-9'>
        <div className='row'>
          <div className='col-6 text-center'>
            <h4>{lang.admin.info.tot_mem}</h4>
            <h3>{users}</h3>
          </div>
          <div className='col-6 text-center'>
            <h4>{lang.admin.info.tot_cit}</h4>
            <h3>{citizens}</h3>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-4 text-center'>
            <h4>{lang.admin.info.reg_weapons}</h4>
            <h3>{weapons}</h3>
          </div>
          <div className='col-4 text-center'>
            <h4>{lang.admin.info.reg_vehicles}</h4>
            <h3>{vehicles}</h3>
          </div>
          <div className='col-4 text-center'>
            <h4>{lang.admin.info.reg_companies}</h4>
            <h3>{companies}</h3>
          </div>
        </div>

        {/* 3rd Row */}
        <div className='row  mt-5 '>
          <div className='col-4 text-center'>
            <h4>{lang.admin.info.tot_tick}</h4>
            <h3>{tickets}</h3>
          </div>
          <div className='col-4 text-center'>
            <h4>{lang.admin.info.tot_arr_rep}</h4>
            <h3>{arrestReports}</h3>
          </div>
          <div className='col-4 text-center'>
            <h4>{lang.admin.info.tot_bol}</h4>
            <h3>{bolos}</h3>
          </div>
        </div>
      </div>
    );
  }
}
