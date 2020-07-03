import { SET_MESSAGE, REMOVE_MESSAGE } from "./types"


// SET MESSAGE
export const setMessage = (message) => dispatch => {
    dispatch({ type: SET_MESSAGE, newMessage: message })
}

// REMOVE MESSAGE
export const removeMessage = () => dispatch => {
    sessionStorage.removeItem("message");

    dispatch({ type: REMOVE_MESSAGE })
}