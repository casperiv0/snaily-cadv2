import { CREATE_WARRANT, CREATE_ARREST_REPORT, CREATE_TICKET, CREATE_WRITTEN_WARNING, SET_MESSAGE } from "./types"
import { handleRequest } from "../functions";
import lang from "../language.json"

export const createWarrant = (data) => dispatch => {
    handleRequest("/officers/create-warrant", "POST", data)
        .then(res => {
            if (res.data.msg === "Added") {
                dispatch({ type: SET_MESSAGE, newMessage: `${lang.record.created_warrant} ${data.fullName}` })
                return dispatch({ type: CREATE_WARRANT });
            }

            console.log(res.data.msg);
        })
        .catch(e => console.log(e));
};

export const createArrestReport = (data) => dispatch => {
    handleRequest("/officers/create-arrest-report", "POST", data)
        .then(res => {
            if (res.data.msg === 'Added') {
                return dispatch({ type: CREATE_ARREST_REPORT });
            }

            console.log(res.data.msg)
        })
}
export const createTicket = data => dispatch => {
    handleRequest("/officers/create-ticket", "POST", data)
        .then(res => {
            if (res.data.msg === 'Added') {
                return dispatch({ type: CREATE_TICKET });
            }

            console.log(res.data.msg);
        })
}

export const createWrittenWarning = data => dispatch => {
    handleRequest("/officers/create-written-warning", "POST", data)
        .then(res => {
            if (res.data.msg === "Added") {
                return dispatch({ type: CREATE_WRITTEN_WARNING });
            }
            console.log(res.data.msg)
        })
}