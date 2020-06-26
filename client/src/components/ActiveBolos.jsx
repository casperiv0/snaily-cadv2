import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBolos, removeBolo } from '../actions/boloActions';
import { setMessage } from '../actions/messageActions';

class ActiveBolos extends Component {
  removeBolo = (id) => {
    this.props.removeBolo(id);
    this.props.setMessage('Successfully removed BOLO.');

    setTimeout(() => this.props.getBolos(), 100);
  };

  componentDidMount() {
    this.props.getBolos();
  }

  render() {
    const { bolos } = this.props;
    return (
      <ul
        className='list-group mt-3 scroll-bar overflow-auto'
        style={{ maxHeight: '25rem' }}>
        <div className='list-group-item bg-secondary border-secondary'>
          Active Bolos
        </div>
        {!bolos[0] ? (
          <li className='list-group-item bg-dark border-dark text-light'>
            There are no active bolos
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
                      <span className='font-weight-bold'>Name: </span>
                      {bolo.name}
                    </p>
                  ) : bolo.type === 'vehicle' ? (
                    <p>
                      {bolo.description} <br />
                      <span className='font-weight-bold'>Plate: </span>
                      {bolo.plate}
                      <br />
                      <span className='font-weight-bold'>Color: </span>
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
                    Remove Bolo
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
