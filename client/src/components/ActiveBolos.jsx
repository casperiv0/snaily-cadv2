import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBolos, removeBolo } from '../actions/boloActions';
import { setMessage } from '../actions/messageActions';
import io from 'socket.io-client';
import { backendURL } from '../config/config';
import language from '../language.json';
const socket = io(backendURL);

class ActiveBolos extends Component {
  removeBolo = (id) => {
    this.props.removeBolo(id);
    this.props.setMessage(language.bolos.removed_bolo);

    setTimeout(() => this.props.getBolos(), 100);
  };

  componentDidMount() {
    this.props.getBolos();

    socket.on('updateBolos', this.props.getBolos);
  }

  render() {
    const { bolos } = this.props;
    return (
      <ul
        className='list-group mt-3 scroll-bar overflow-auto'
        style={{ maxHeight: '25rem' }}>
        <div className='list-group-item bg-secondary border-secondary'>
          {language.global.active_bolos}
        </div>
        {!bolos[0] ? (
          <li className='list-group-item bg-dark border-dark text-light'>
            {language.global.no_bolos}
          </li>
        ) : (
          bolos.map((bolo, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-secondary text-light d-flex justify-content-between'>
                <div className='d-flex'>
                  {++index} | &nbsp;
                  {bolo.type === 'person' ? (
                    <p>
                      {bolo.description} <br />
                      <span className='font-weight-bold'>{language.global.name}: </span>
                      {bolo.name}
                    </p>
                  ) : bolo.type === 'vehicle' ? (
                    <p>
                      {bolo.description} <br />
                      <span className='font-weight-bold'>{language.global.plate}: </span>
                      {bolo.plate}
                      <br />
                      <span className='font-weight-bold'>{language.global.color}: </span>
                      {bolo.color}
                    </p>
                  ) : (
                    <p>
                      {bolo.description} <br />
                    </p>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.removeBolo(bolo.id);
                    }}
                    className='btn btn-danger'>
                    {language.bolos.remove_bolo}
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  bolos: state.bolos.items,
  removeBolo: state.bolos.items,
});

export default connect(mapStateToProps, {
  getBolos,
  removeBolo,
  setMessage,
})(ActiveBolos);
