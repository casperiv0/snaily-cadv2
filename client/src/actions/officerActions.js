import { SET_STATUS, GET_CURRENT_OFFICER_STATUS, SET_ON_DUTY } from "./types"
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";

export const setOfficerStatus = (officerId, status) => dispatch => {
    axios({
        url: backendURL + '/dispatch/update-officer/' + officerId,
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            status: 'on-duty',
            status2: status,
        },
    })
        .then((res) => {
            dispatch({ type: SET_STATUS, newStatus: status, officerName: res.data.officerName })
        })
        .catch((err) => console.log(err));
}


export const getCurrentOfficerStatus = (officerId) => dispatch => {
    axios({
        url: backendURL + '/officers/get-status/' + officerId,
        method: 'GET',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    })
        .then((res) => {
            if (res.data.officer) {
                dispatch({ type: GET_CURRENT_OFFICER_STATUS, status: res.data.officer.status, status2: res.data.officer.status2, officerName: res.data.officer.officer_name })
            }
        })
        .catch((err) => console.log(err));
}

export const setOnDuty = (officerId) => dispatch => {
    axios({
        url: backendURL + '/dispatch/update-officer/' + officerId,
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            status: 'on-duty',
            status2: "10-8"
        }
    })
        .then((res) => {
            dispatch({ type: SET_ON_DUTY, status: "on-duty", status2: "10-8", officerName: res.data.officerName })
        })
        .catch((err) => console.log(err));
}

export const setOffDuty = (officerId) => dispatch => {
    axios({
        url: backendURL + '/dispatch/update-officer/' + officerId,
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            status: 'off-duty',
        }
    })
        .then(() => {
            dispatch({ type: SET_ON_DUTY, status: "off-duty", status2: "" })
        })
        .catch((err) => console.log(err));
}