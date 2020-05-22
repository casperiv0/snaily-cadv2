import React, { Component } from 'react'
import axios from "axios"
import { backendURL } from '../../config/config';
import Cookies from "js-cookie";

export default class Tow extends Component {

    constructor() {
        super()

        this.state = {
            towCalls: []
        };
    };

    getTowCalls = () => {
        axios({
            url: backendURL+"/global/tow-calls",
            headers: {
                "x-auth-snailycad-token": Cookies.get("__session")
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({
                    towCalls: res.data.calls
                })
            }
        })
    };

    componentDidMount() {
        this.getTowCalls();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
