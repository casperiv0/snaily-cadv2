import { EMS_SET_OFF_DUTY, EMS_GET_STATUS, EMS_SET_ON_DUTY, EMS_SET_STATUS } from "./types"
import { backendURL } from "../config/config";
import io from "socket.io-client";
import { handleRequest } from "../functions";
const socket = io(backendURL);

export const setEmsFdStatus = (id, status) => dispatch => {
    handleRequest("/dispatch/update-ems-fd/" + id, "PUT", { status: "on-duty", status2: status })
        .then((res) => {
            socket.emit("updateActiveUnits");
            dispatch({ type: EMS_SET_STATUS, newStatus: status, deputyName: res.data.deputyName })
        })
        .catch((err) => console.log(err));
}


export const getEmsFdStatus = (id) => dispatch => {
    handleRequest("/ems-fd/get-status/" + id, "GET")
        .then((res) => {
            if (res.data.deputy) {
                dispatch({ type: EMS_GET_STATUS, status: res.data.deputy.status, status2: res.data.deputy.status2, officerName: res.data.deputy.name })
            }
        })
        .catch((err) => console.log(err));
}


export const setOnDuty = (id) => dispatch => {
    handleRequest("/dispatch/update-ems-fd/" + id, "PUT", { status: "on-duty", status2: "10-8" })
        .then((res) => {
            socket.emit("updateActiveUnits");
            dispatch({ type: EMS_SET_ON_DUTY, status: "on-duty", status2: "10-8", deputyName: res.data.deputyName })
        })
        .catch((err) => console.log(err));
}

export const setOffDuty = (id) => dispatch => {
    handleRequest("/dispatch/update-ems-fd/" + id, "PUT", { status: "off-duty" })
        .then(() => {
            socket.emit("updateActiveUnits");
            dispatch({ type: EMS_SET_OFF_DUTY, status: "off-duty", status2: "" })
        })
        .catch((err) => console.log(err));
}