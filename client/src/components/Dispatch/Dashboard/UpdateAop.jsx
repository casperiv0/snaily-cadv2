import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAop, updateAop } from '../../../actions/otherActions';
import { setMessage } from '../../../actions/messageActions';
import lang from '../../../language.json';

class UpdateAop extends Component {
  constructor() {
    super();

    this.state = {
      aop: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.updateAop(this.state.aop);
    this.props.setMessage(lang.dispatch.updated_aop);
    this.setState({
      aop: '',
    });
  };

  render() {
    return (
      <div className='col-md-4'>
        <div className='card bg-dark border-dark'>
          <div className='card-header bg-secondary border-secondary'>
            <h5>{lang.dispatch.update_aop}</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='aop'>{lang.dispatch.enter_new_aop}</label>
                <input
                  className='form-control bg-dark border-secondary text-light'
                  type='text'
                  name='aop'
                  id='aop'
                  onChange={this.onChange}
                  placeholder={lang.dispatch.aop}
                  required
                  value={this.state.aop}
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-success w-100' type='submit'>
                  {lang.dispatch.update_aop}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  aop: state.aop.aop,
});

export default connect(mapStateToProps, { getAop, updateAop, setMessage })(
  UpdateAop
);
