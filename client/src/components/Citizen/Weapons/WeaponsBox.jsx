import React, { Component } from 'react'
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from "js-cookie"

export default class WeaponsBox extends Component {

    constructor() {
        super()

        this.state = {
            weapons: []
        };
    };

    getWeapons = () =>{
        Axios({
            url: backendURL+"/c/weapons",
            method: "GET",
            headers: {
                "x-auth-snailycad-token": Cookies.get("__session")
            }
        })
        .then(res => {
            if (res.data.weapons) {
                this.setState({
                    weapons: res.data.weapons
                });
            } else {
                console.log('there was an error getting the weapons');
            };
        })
        .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getWeapons()
    }

    render() {
        const {weapons} = this.state;
        return (
            <div>
                
            </div>
        )
    }
}
