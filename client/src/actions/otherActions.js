import { UPDATE_AOP, GET_AOP, PANIC_START } from "./types"
import { backendURL } from "../config/config";
import io from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";
const socket = io(backendURL);

export const updateAop = (newAop) => dispatch => {    
    axios({
        url: backendURL + '/dispatch/update-aop',
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            newAop: newAop,
        },
    })
        .then((res) => {
            if (res.data.msg === 'Updated') {
                socket.emit("updateAop", newAop);
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

export const panicStart = (officer) => dispatch => {
    socket.emit("panicStart", { start: true, officerId: officer.id, officerName: officer.officerName });

    dispatch({ type: PANIC_START })
}