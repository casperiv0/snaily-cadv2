// import { getSession } from "./getSession";
// import { Route, Redirect } from "react-router-dom";
// import React from "react";
// import axios from 'axios';
// import { backendURL } from '../../config/config';
// import Cookies from 'js-cookie';
// import { Component } from "react";


// class TowAuthRoute extends Component {

//     constructor() {
//         super()

//         this.state = {
//             towAccess: false
//         };
//     };

//     getTowAccess =  () => {
//         const { towAccess } = this.state;
//         axios.get(backendURL + "/auth/user", {
//             headers: {
//                 "x-auth-snailycad-token": Cookies.get("__session"),
//             },
//         })
//             .then(res => {
//                 console.log(res.data.user[0].tow);

//                 if (res.data.user[0]) {
//                     if (res.data.user[0].tow === "yes") {
//                         this.setState({
//                             towAccess: true
//                         });
//                     } else {
//                         this.setState({
//                             towAccess: false
//                         });
//                     };
//                 }
//             })
//             .catch(err => console.log(err));
//     };

//     componentDidMount() {
//         this.getTowAccess();
//     }


//     render() {
//         const { component: Component, ...rest } = this.props;
//         const { towAccess } = this.state;

        

//         return (
//             <Route
//                 {...rest}
//                 render={props =>
//                     getSession() ?
//                         towAccess === true ? (
//                             <Component {...props} />
//                         ) : (
//                                 <Redirect to="/403" />
//                             )
//                         : <Redirect
//                             to={{
//                                 pathname: "/auth/login",
//                                 state: { from: props.location }
//                             }}
//                         />
//                 }
//             />
//         );
//     }
// };

export default TowAuthRoute;