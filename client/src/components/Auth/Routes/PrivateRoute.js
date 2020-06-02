import { getSession } from "../getSession";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import { Component } from "react";
import Spinner from "../../Partials/LoadingArea"


class PrivateRoute extends Component {

    constructor() {
        super()

        this.state = {
            loading: true
        };
    };

    getUser = () => {
        axios.get(backendURL + "/auth/user", {
            headers: {
                "x-auth-snailycad-token": Cookies.get("__session"),
            },
        })
            .then(res => {
                if (res.data.user) {
                    this.setState({
                        loading: false
                    });
                } else {
                    window.location = "/auth/login"
                }
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getUser();
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { loading } = this.state;

        // I'll refactor this soon.
        return (
            <Route
                {...rest}
                render={props => {
                    if (getSession()) {
                        if (loading) {
                            return (<Spinner />)
                        } else {
                            return (<Component {...props} />)
                        };

                    } else {
                        return (<Redirect
                            to={{
                                pathname: "/auth/login",
                                state: { from: props.location }
                            }}
                        />)
                    }
                }
                }
            />
        );
    }
};

export default PrivateRoute;