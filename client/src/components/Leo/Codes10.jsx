import React, { Component } from 'react';
import lang from "../../language.json"

export default class Codes10 extends Component {
  render() {
    return (
      <div className='container-fluid pb-5 text-light'>
        <div className='d-flex justify-content-between'>
          <h2>{lang.officers.codes}</h2>
          <a href='/leo/dash' className='btn btn-secondary mb-2'>
            {lang.officers.back_to_dash}
          </a>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <li className='list-group-item bg-dark border-dark text-light'>
              Service Status:
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-5: Meal Break <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-7: Out of Service, <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-8: In service <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-12: Active ride along <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-23: Arrived on scene <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-41: beginning tour of duty <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-42: Ending tour of duty <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-65: Escorting lirisoner <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-93: Removed from game <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-97: In route <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Code 0: Game crash <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Code 1: No Lights nor sirens <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Code 2: Lights, no sirens <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Code 3: Lights and Sirens
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Signal 11: Running Radar
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Signal 41: 10-41 | 10-8
            </li>
          </div>
          <div className='col-md-3'>
            <li className='list-group-item bg-dark border-dark text-light'>
              Scenes:
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-10: Fights in progress <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-11: Traffic Stop <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-13: Shots Fired <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-16: Stolen Vehicle <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-17: Suspicious Vehic <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-25: Domestic Dispute <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-49: Homicide <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-50: Vehicle Acciden <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-62: kidnapping <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-64: Sexual assault <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-66: Reckless Driver <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-67: Fire <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-68: Armed Robbery <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-70: Foot Pursuit <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-80: Vehicle Pursuit <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-99: Officer in distre <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Code 5: Felony Stop <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Signal 60: Drugs
            </li>
          </div>
          <div className='col-md-3'>
            <li className='list-group-item bg-dark border-dark text-light'>
              Requests:
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-27: Drivers License Check <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-28: Plate Check <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-29: Warrant Check <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-32: Requesting Backup <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-51: Towing Service <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-52: EMS service <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-53: Fire Dept. Service <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-71: Supervisor needed
            </li>
          </div>
          <div className='col-md-3'>
            <li className='list-group-item bg-dark border-dark text-light'>
              Subject Status:
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-0: Disappeared <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-30: Wanted Person <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-55: Intoxicated Driver <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-60: Armed With a Gun <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-44: Person Deceased <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-15: Subject in Custody <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-31: Not wanted, No warrants <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-56: Intoxicated Pedestrian <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-61: Armed with a knife
            </li>
          </div>
          <div className='col-md-3'>
            <li className='list-group-item bg-dark border-dark text-light'>
              Radio Comms:
            </li>

            <li className='list-group-item bg-dark border-dark text-light'>
              10-1: Frequency Change <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-2: Radio Check <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-3: Stop Transmitting <br />
            </li>

            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-4: Affirmative <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-6: busy <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-9: Repeat <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-22: Disregard <br />
            </li>

            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-26: ETA <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-35: Wrap up the scene <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-43: Information <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              10-73: Advise Status <br />
            </li>

            <li className='list-group-item bg-dark border-dark text-light'>
              {' '}
              10-90: In game warning <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Code 4: Under control <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Signal 37: Meet at Location <br />
            </li>
            <li className='list-group-item bg-dark border-dark text-light'>
              Signal 100: Emergency traffic
            </li>
          </div>
        </div>
      </div>
    );
  }
}
