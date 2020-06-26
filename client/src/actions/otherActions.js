import { UPDATE_AOP, GET_AOP, PANIC_START } from "./types"
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";

export const updateAop = (newAop) => dispatch => {
    axios({
        url: backendURL + '/dispatch/update-aop',
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            newAop,
        },
    })
        .then((res) => {
            if (res.data.msg === 'Updated') {
                dispatch({ type: UPDATE_AOP, newAop: newAop });
            }
        })
        .catch((err) => console.log(err));
}


export const getAop = () => dispatch => {
    axios({
        url: backendURL + '/auth/cad-info/',
        method: 'GET',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    })
        .then((res) => {
            dispatch({ type: GET_AOP, aop: res.data.cadInfo[0].AOP });

        })
        .catch((err) => console.log(err));
}