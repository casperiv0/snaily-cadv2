import { CREATE_WARRANT } from "./types"
import { handleRequest } from "../functions";

export const createWarrant = (data) => dispatch => {
    handleRequest("/officers/create-warrant", "POST", data)
        .then(res => {
            if (res.data.msg === "Added") {
                return dispatch({ type: CREATE_WARRANT });
            }

            console.log(res.data.msg);
        })
        .catch(e => console.log(e));
};