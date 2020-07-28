import React, { Component } from 'react';
import LoadingArea from '../Partials/LoadingArea';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import ReactMarkdown from 'react-markdown';
import lang from "../../language.json"

export default class PenalCodes extends Component {
  constructor() {
    super();

    this.state = {
      penalCodes: [],
      filteredPenalCodes: [],
      loading: true,
    };
  }

  getPenalCodes = () => {
    Axios({
      url: backendURL + '/officers/penal-codes',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.penalCodes) {
          this.setState({
            penalCodes: res.data.penalCodes,
            filteredPenalCodes: res.data.penalCodes,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Penal Codes - LEO';
    this.getPenalCodes();
  }

  handleSearch = (e) => {
    // Thanks to: https://codepen.io/iamtimsmith/pen/zJPzwN?editors=1010
    let currentList = [];
    let newList = [];

    if (e.target.value === '') {
      newList = this.state.penalCodes;
    } else {
      currentList = this.state.penalCodes;

      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    }

    this.setState({
      filteredPenalCodes: newList,
    });
  };

  render() {
    const { filteredPenalCodes, loading } = this.state;

    if (loading) return <LoadingArea />;

    return (
      <div className='container-fluid mt-3 text-light'>
        <div className="d-flex justify-content-between mb-2">
        <h3>{lang.global.penal_codes}</h3>
        <a href="/leo/dash" className="btn btn-secondary">{lang.officers.back_to_dash}</a>
        </div>
        <ul className='list-group'>
          <input
            type='search'
            name='penalCode'
            placeholder='Search By Title'
            onChange={this.handleSearch}
            className='form-control bg-dark border-secondary text-light mb-3'
          />
          {!filteredPenalCodes[0] ? (
            <ErrorMessage message='No Penal Codes found with that title' />
          ) : (
            filteredPenalCodes.map((code, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary'>
                  <h4 className='font-weight-bold'> {code.title} </h4>
                  <ReactMarkdown escapeHtml={false} source={code.des} />
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}
