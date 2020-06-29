import { GET_911_CALLS, CREATE_911_CALL, END_911_CALL, UPDATE_911_CALL } from "./types"
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";
const socket = io(backendURL);

export const get911Calls = () => dispatch => {
    axios({
        url: backendURL + "/global/911calls",
        method: "GET",
        headers: {
            "x-auth-snailycad-token": Cookies.get("__session"),
        }
    }).then(res => {
        dispatch({ type: GET_911_CALLS, calls: res.data.calls })
    })
}

export const create911Call = (data) => dispatch => {
    axios({
        url: backendURL + '/global/create-911-call',
        headers: { 'x-auth-snailycad-token': Cookies.get('__session') },
        method: 'POST',
        data: {
            description: data.description,
            caller: data.caller,
            location: data.location,
        },
    }).then((res) => {
        if (res.data.msg === '911 was called') {
            socket.emit("update911Calls")
            dispatch({ type: CREATE_911_CALL, calls: get911Calls })
        }
    });
}

export const end911Call = (callId) => dispatch => {
    axios({
        url: backendURL + '/global/911calls/' + callId,
        method: 'DELETE',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    }).then((res) => {
        if (res.data.msg === 'Canceled') {
            socket.emit("update911Calls");
            dispatch({ type: END_911_CALL });
        }
    });
}

export const update911Call = (data) => dispatch => {
    axios({
        url: backendURL + '/global/911calls/' + data.callId,
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            location: data.callLocation,
            description: data.callDescription,
            assigned_unit: data.assignedUnits,
        },
    })
        .then((res) => {
            if (res.data.msg === 'Updated') {
                socket.emit("update911Calls");
                dispatch({ type: UPDATE_911_CALL });
            }
        })
        .catch((err) => console.log(err));
}