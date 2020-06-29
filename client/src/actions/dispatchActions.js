import { GET_ACTIVE_UNITS } from "./types";
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";

export const getAllActiveUnits = () => dispatch => {
    axios({
        url: backendURL + '/dispatch',
        method: 'GET',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    }).then((res) => {
        dispatch({ type: GET_ACTIVE_UNITS, officers: res.data.onDutyOfficers, emsFd: res.data.onDutyEMS_FD });
    });
}