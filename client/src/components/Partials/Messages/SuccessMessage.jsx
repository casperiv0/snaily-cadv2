import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeMessage } from '../../../actions/messageActions';

class SuccessMessage extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.removeMessage();
    }, 5000);
  }

  render() {
    const { message, dismiss } = this.props;
    return (
      <div className='alert alert-dismissible alert-success'>
        {message}
        {!dismiss ? null : (
          <button
            type='button'
            className='close fade'
            onClick={this.props.removeMessage}
            aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        )}
      </div>
    );
  }
}

export default connect(null, {
  removeMessage,
})(SuccessMessage);
