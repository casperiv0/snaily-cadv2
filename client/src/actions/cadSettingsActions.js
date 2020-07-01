import { GET_CAD_SETTINGS, UPDATE_CAD_SETTINGS } from "./types"
import { backendURL } from "../config/config";
import io from "socket.io-client";
import { handleRequest } from "../functions";
const socket = io(backendURL);

export const getCadSettings = () => dispatch => {
    handleRequest("/auth/cad-info", "GET")
        .then((res) => {
            dispatch({ type: GET_CAD_SETTINGS, settings: res.data.cadInfo[0] });
        })
        .catch((err) => console.log(err));
}


export const updateCadSettings = (newSettings) => dispatch => {
    handleRequest("/admin/edit-cad", "PUT", newSettings)
        .then((res) => {
            if (res.data.msg === 'CAD Updated') {
                socket.emit("updateAop"); // Update AOP
                dispatch({ type: UPDATE_CAD_SETTINGS, settings: newSettings })
            }
        })
        .catch((err) => console.log(err));
}