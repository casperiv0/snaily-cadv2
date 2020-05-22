import React, { Component } from 'react'
import Spinner from "@material-ui/core/CircularProgress"


export default class LoadingArea extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "95vh"}}>
                <Spinner />
            </div>
        )
    }
}
