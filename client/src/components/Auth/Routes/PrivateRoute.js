import { getSession } from "../getSession";
import { Route, Redirect } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                getSession() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/auth/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;