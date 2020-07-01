import { GET_TOW_CALLS, CREATE_TOW_CALL, END_TOW_CALL } from "./types"
import { backendURL } from "../config/config";
import io from "socket.io-client";
import { handleRequest } from "../functions";
const socket = io(backendURL);

export const getTowCalls = () => dispatch => {
    handleRequest("/global/tow-calls", "GET")
        .then(res => {
            dispatch({ type: GET_TOW_CALLS, calls: res.data.towCalls })
        })
        .catch(e => console.log(e));
}

export const createTowCall = (data) => dispatch => {
    handleRequest("/global/create-tow-call", "POST", data)
        .then(() => {
            socket.emit("updateTowCalls")
            dispatch({ type: CREATE_TOW_CALL, calls: getTowCalls })
        })
        .catch(e => console.log(e));
}

export const endTowCall = (callId) => dispatch => {
    handleRequest("/global/tow-calls/" + callId, "DELETE")
        .then((res) => {
            if (res.data.msg === 'Canceled') {
                socket.emit("updateTowCalls");
                dispatch({ type: END_TOW_CALL });
            }
        })
        .catch(e => console.log(e));
}