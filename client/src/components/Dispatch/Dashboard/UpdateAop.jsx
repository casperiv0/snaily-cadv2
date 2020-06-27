import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAop, updateAop } from '../../../actions/otherActions';
import { setMessage } from '../../../actions/messageActions';

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
    this.props.setMessage("Successfully updated AOP");
  };

  render() {
    return (
      <div className='col-md-4'>
        <div className='card bg-dark border-dark'>
          <div className='card-header bg-secondary border-secondary'>
            <h5>Update AOP</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='aop'>Enter New AOP</label>
                <input
                  className='form-control bg-dark border-secondary text-light'
                  type='text'
                  name='aop'
                  id='aop'
                  onChange={this.onChange}
                  placeholder='Enter new Area of Roleplay'
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-success container' type='submit'>
                  Update Aop
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

export default connect(mapStateToProps, { getAop, updateAop, setMessage })(UpdateAop);
