import { getSession } from "./getSession";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import { Component } from "react";
import Spinner from "../Partials/LoadingArea"


class TowAuthRoute extends Component {

    constructor() {
        super()

        this.state = {
            EMSFDAccess: false,
            loading: true
        };
    };

    getTowAccess = () => {
        axios.get(backendURL + "/auth/user", {
            headers: {
                "x-auth-snailycad-token": Cookies.get("__session"),
            },
        })
            .then(res => {
                if (res.data.user[0]) {
                    if (res.data.user[0].ems_fd === "yes") {
                        this.setState({
                            EMSFDAccess: true,
                            loading: false
                        });
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                } else {
                    console.log('User not found');
                }
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getTowAccess();
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { EMSFDAccess, loading } = this.state;

        // I'll refactor this soon.
        return (
            <Route
                {...rest}
                render={props => {
                    if (getSession()) {
                        if (loading) {
                            return (<Spinner />)
                        } else {
                            if (!EMSFDAccess === false) {
                                return (<Component {...props} />)
                            } else {
                                window.location = "/403"
                            };
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

export default TowAuthRoute;