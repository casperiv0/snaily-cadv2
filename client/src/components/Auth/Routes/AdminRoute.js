import { getSession } from "../getSession";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import { Component } from "react";
import Spinner from "../../Partials/LoadingArea"
import AdminSideHeader from '../../Partials/AdminSideHeader';



class AdminRoute extends Component {

    constructor() {
        super()

        this.state = {
            adminAccess: false,
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
                    const { rank } = res.data.user[0]
                    if (rank === "moderator" || rank === "admin" || rank === "owner") {
                        this.setState({
                            adminAccess: true,
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
        const { adminAccess, loading } = this.state;

        // I'll refactor this soon.
        return (
            <div className="container-fluid">
                <div className="row">
                    <AdminSideHeader />
                    <Route
                        {...rest}
                        render={props => {
                            if (getSession()) {
                                if (loading) {
                                    return (<Spinner />)
                                } else {
                                    if (!adminAccess === false) {
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
                </div>
            </div>
        );
    }
};

export default AdminRoute;