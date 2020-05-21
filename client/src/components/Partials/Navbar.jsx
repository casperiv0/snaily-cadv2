import React, { Component } from 'react';

export default class NavigationBar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <a className='navbar-brand' href='/'>
          SnailyCAD
        </a>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='/officers/dash'>
                Police Dept
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/dispatch'>
                Dispatch
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/ems-fd'>
                EMS/FD
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/citizen'>
                Citizen
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/tow'>
                Tow
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/bleeter'>
                Bleeter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
