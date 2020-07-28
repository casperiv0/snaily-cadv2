import { handleRequest } from "../functions"
import { GET_CITIZENS_BY_ACC, SET_MESSAGE, GET_CITIZENS_BY_ID, GET_ALL_CITIZENS } from "./types"

export const getCitizensByAcc = () => dispatch => {
    handleRequest("/citizen", "GET")
        .then(res => {
            if (res.data.citizens) {
                dispatch({ type: GET_CITIZENS_BY_ACC, citizens: res.data.citizens });
            }
        })
        .catch(e => console.log(e));
}

export const getCitizenById = id => dispatch => {
    handleRequest(`/citizen/${id}`, "GET")
        .then(res => {
            if (res.data.msg === "Forbidden") {
                dispatch({
                    type: SET_MESSAGE, content: "This citizen is not linked to your account, Therefore you can't view this citizen."
                })
                return window.location = "/citizen";
            }

            if (res.data.msg === "Citizen Not Found") {
                dispatch({
                    type: SET_MESSAGE, content: "Citizen Was not found!"
                })
                return window.location = "/citizen";
            };

            if (res.data.citizen) {
                dispatch({ type: GET_CITIZENS_BY_ID, citizen: res.data.citizen[0] });
            }
        })
        .catch(e => console.log(e));
}

export const deleteCitizenById = id => dispatch => {
    handleRequest(`/citizen/${id}`, "DELETE")
        .then(res => {
            if (res.data.msg === 'Deleted') {
                dispatch({ type: SET_MESSAGE, content: "Successfully Deleted Citizen" });
                return (window.location = '/citizen');
            }

            console.log('There was an error deleting your citizen');
        })
}

export const getAllCitizens = () => dispatch => {
    handleRequest("/admin/citizens", "GET")
        .then(res => {
            if (res.data.citizens) {
                return dispatch({ type: GET_ALL_CITIZENS, citizens: res.data.citizens })
            }

            console.log(res.data.msg);
        })
}