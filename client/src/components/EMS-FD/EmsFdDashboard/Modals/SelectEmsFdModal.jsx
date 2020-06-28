import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setOnDuty } from '../../../../actions/emsFdActions';

class SelectEmsFdModal extends Component {
  constructor() {
    super();

    this.state = {
      deputyId: '',
      deputies: [],
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getEmsFdDeputies = () => {
    Axios({
      url: backendURL + '/ems-fd',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          deputies: res.data.deputies,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getEmsFdDeputies();
  }

  onSubmit = (e) => {
    e.preventDefault();

    Cookies.set('on-duty-ems-fdId', this.state.deputyId);
    document.getElementById("closeSelectEmsFdModal").click();
    this.props.setOnDuty(this.state.deputyId);
  };

  render() {
    const { deputies } = this.state;
    return (
      <div
        className='modal fade'
        id='selectEmsFdModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='selectEmsFdModal'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='selectEmsFdModal'>
                Please select a EMS/FD Deputy before continuing
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                id="closeSelectEmsFdModal"
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='deputyId'>Select EMS/FD Deputy</label>
                  <select
                    name='deputyId'
                    id='deputyId'
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}>
                    <option>Select Deputy..</option>
                    {!deputies[0] ? (
                      <option>You don't have any deputies!</option>
                    ) : (
                      deputies.map((deputy, index) => {
                        return (
                          <option key={index} value={deputy.id}>
                            {deputy.name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Cancel
                </button>
                {!deputies[0] ? (
                  <a
                    href='/ems-fd/deputies/create-deputy'
                    className='btn btn-primary'>
                    Create a deputy
                  </a>
                ) : (
                  <button type='submit' className='btn btn-primary'>
                    Go on-duty
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { setOnDuty })(SelectEmsFdModal);
