import { GET_ACTIVE_UNITS } from "./types";
import { handleRequest } from "../functions";

export const getAllActiveUnits = () => dispatch => {
    handleRequest("/dispatch", "GET")
        .then((res) => {
            dispatch({ type: GET_ACTIVE_UNITS, officers: res.data.onDutyOfficers, emsFd: res.data.onDutyEMS_FD });
        })
        .catch(e => console.log(e));
}