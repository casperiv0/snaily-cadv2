import { GET_MESSAGE, SET_MESSAGE, REMOVE_MESSAGE } from "./types"


// GET MESSAGE
export const getMessage = () => dispatch => {
    const message = sessionStorage.getItem("message");

    dispatch({ type: GET_MESSAGE, content: message });
}

// SET MESSAGE
export const setMessage = (message) => dispatch => {
    sessionStorage.setItem("message", message);

    dispatch({ type: SET_MESSAGE, newMessage: message })
}

// REMOVE MESSAGE
export const removeMessage = () => dispatch => {
    sessionStorage.removeItem("message");

    dispatch({ type: REMOVE_MESSAGE })
}