import { GET_TOW_CALLS, CREATE_TOW_CALL, END_TOW_CALL } from "./types"
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";
const socket = io(backendURL);

export const getTowCalls = () => dispatch => {
    axios({
        url: backendURL + "/global/tow-calls",
        method: "GET",
        headers: {
            "x-auth-snailycad-token": Cookies.get("__session"),
        }
    }).then(res => {
        dispatch({ type: GET_TOW_CALLS, calls: res.data.towCalls })
    })
}

export const createTowCall = (data) => dispatch => {
    axios({
        url: backendURL + '/global/create-tow-call',
        headers: { 'x-auth-snailycad-token': Cookies.get('__session') },
        method: 'POST',
        data: {
            description: data.description,
            caller: data.caller,
            location: data.location,
        },
    }).then(() => {
        socket.emit("updateTowCalls")
        dispatch({ type: CREATE_TOW_CALL, calls: getTowCalls })
    });
}

export const endTowCall = (callId) => dispatch => {
    axios({
        url: backendURL + '/global/tow-calls/' + callId,
        method: 'DELETE',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    }).then((res) => {
        if (res.data.msg === 'Canceled') {
            socket.emit("updateTowCalls");
            dispatch({ type: END_TOW_CALL });
        }
    });
}