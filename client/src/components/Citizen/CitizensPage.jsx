import React, { Component } from 'react';
import TopButtons from './TopButtons';
import NoCitizensMessage from '../Partials/Messages/NoCitizensMessage';
import CitizenBox from './CitizenBox';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import { connect } from 'react-redux';
import { removeMessage } from '../../actions/messageActions';
import { getCitizensByAcc } from '../../actions/citizenActions';

class CitizensPage extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      citizens: [],
    };
  }

  componentDidMount() {
    document.title = 'Citizens - All your citizens';
    this.getCitizens();
  }

  getCitizens = () => {
    this.props.getCitizensByAcc();
  };

  componentDidUpdate() {
    document.addEventListener('beforeunload', this.props.removeMessage);
  }

  render() {
    const { message, citizens } = this.props;

    return (
      <div className='container pb-5'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <TopButtons />

        <ul className='list-group mt-2'>
          {!citizens[0] ? (
            <NoCitizensMessage />
          ) : (
            citizens.map((citizen, index) => {
              return (
                <CitizenBox
                  id={citizen.id}
                  key={index}
                  index={index}
                  fullName={citizen.full_name}
                />
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.message.content,
  citizens: state.citizens.citizens,
});

export default connect(mapStateToProps, { removeMessage, getCitizensByAcc })(
  CitizensPage
);
