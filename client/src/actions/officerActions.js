import { SET_STATUS, GET_CURRENT_OFFICER_STATUS, SET_ON_DUTY, SET_OFF_DUTY } from "./types"
import { backendURL } from "../config/config";
import io from "socket.io-client";
import { handleRequest } from "../functions";
const socket = io(backendURL);

export const setOfficerStatus = (officerId, status) => dispatch => {
    handleRequest("/dispatch/update-officer/" + officerId, "PUT", { status: "on-duty", status2: status })
        .then((res) => {
            socket.emit("updateActiveUnits");
            dispatch({ type: SET_STATUS, newStatus: status, officerName: res.data.officerName })
        })
        .catch((err) => console.log(err));
}


export const getCurrentOfficerStatus = (officerId) => dispatch => {
    handleRequest("/officers/get-status/" + officerId, "GET")
        .then((res) => {
            if (res.data.officer) {
                dispatch({ type: GET_CURRENT_OFFICER_STATUS, status: res.data.officer.status, status2: res.data.officer.status2, officerName: res.data.officer.officer_name })
            }
        })
        .catch((err) => console.log(err));
}

export const setOnDuty = (officerId) => dispatch => {
    handleRequest("/dispatch/update-officer/" + officerId, "PUT", { status: "on-duty", status2: "10-8" })
        .then((res) => {
            socket.emit("updateActiveUnits");
            dispatch({ type: SET_ON_DUTY, status: "on-duty", status2: "10-8", officerName: res.data.officerName })
        })
        .catch((err) => console.log(err));
}

export const setOffDuty = (officerId) => dispatch => {
    handleRequest("/dispatch/update-officer/" + officerId, "PUT", { status: "off-duty" })
        .then(() => {
            socket.emit("updateActiveUnits");
            dispatch({ type: SET_OFF_DUTY, status: "off-duty", status2: "" })
        })
        .catch((err) => console.log(err));
}