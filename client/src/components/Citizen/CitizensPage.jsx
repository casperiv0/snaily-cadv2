import React, { Component } from 'react';
import TopButtons from './TopButtons';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import NoCitizensMessage from '../Partials/Messages/NoCitizensMessage';
import CitizenBox from './CitizenBox';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import LoadingArea from '../Partials/LoadingArea';
import { connect } from 'react-redux';
import { removeMessage } from '../../actions/messageActions';

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
    axios({
      url: backendURL + '/citizen',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.citizens) {
        this.setState({
          citizens: res.data.citizens,
          loading: false,
        });
      }

      this.setState({
        loading: false,
      });
    });
  };

  componentDidUpdate() {
    document.addEventListener('beforeunload', this.props.removeMessage);
  }

  render() {
    const { citizens, loading } = this.state;
    const { message } = this.props;
    if (loading) {
      return <LoadingArea />;
    }
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
});

export default connect(mapStateToProps, { removeMessage })(CitizensPage);
