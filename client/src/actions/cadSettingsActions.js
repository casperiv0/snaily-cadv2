import { GET_CAD_SETTINGS, UPDATE_CAD_SETTINGS } from "./types"
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";

export const getCadSettings = () => dispatch => {
    axios({
        url: backendURL + '/auth/cad-info',
        method: 'GET',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    })
        .then((res) => {
            dispatch({ type: GET_CAD_SETTINGS, settings: res.data.cadInfo[0] });
        })
        .catch((err) => console.log(err));
}


export const updateCadSettings = (newSettings) => dispatch => {
    axios({
        url: backendURL + '/admin/edit-cad',
        method: 'PUT',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            cadName: newSettings.cadName,
            newAop: newSettings.newAop,
            whitelist: newSettings.whitelist,
            towWhitelist: newSettings.towWhitelist,
            companyWhitelisted: newSettings.companyWhitelisted,
        },
    })
        .then((res) => {
            if (res.data.msg === 'CAD Updated') {
                dispatch({ type: UPDATE_CAD_SETTINGS, settings: newSettings })
            }
        })
        .catch((err) => console.log(err));
}