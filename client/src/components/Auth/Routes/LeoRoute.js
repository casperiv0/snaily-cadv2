import { getSession } from "../getSession";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import { Component } from "react";
import Spinner from "../../Partials/LoadingArea"

class AdminRoute extends Component {

    constructor() {
        super()

        this.state = {
            leoAccess: false,
            loading: true
        };
    };

    getAdminAccess = () => {
        axios.get(backendURL + "/auth/user", {
            headers: {
                "x-auth-snailycad-token": Cookies.get("__session"),
            },
        })
            .then(res => {
                if (res.data.user) {
                    const { leo } = res.data.user[0]
                    if (leo === "yes") {
                        this.setState({
                            leoAccess: true,
                            loading: false
                        });
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                } else {
                    window.location = "/auth/login"
                }
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getAdminAccess();
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { leoAccess, loading } = this.state;

        // I'll refactor this soon.
        return (
            <Route
                {...rest}
                render={props => {
                    if (getSession()) {
                        if (loading) {
                            return (<Spinner />)
                        } else {
                            if (!leoAccess === false) {
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

export default AdminRoute;