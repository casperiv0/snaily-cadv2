import { GET_BOLOS, CREATE_BOLO, REMOVE_BOLO } from "./types"
import { backendURL } from "../config/config";
import io from "socket.io-client";
import { handleRequest } from "../functions";
const socket = io(backendURL);

export const getBolos = () => dispatch => {
    handleRequest("/global/bolos", "GET")
        .then((res) => {
            dispatch({ type: GET_BOLOS, bolos: res.data.bolos });
        })
        .catch((err) => console.log(err));
}

export const removeBolo = (boloId) => dispatch => {
    handleRequest("/global/bolos/" + boloId, "DELETE")
        .then((res) => {
            if (res.data.msg === 'Deleted Bolo') {
                socket.emit("updateBolos")
                dispatch({ type: REMOVE_BOLO, bolos: getBolos })
            }
        })
        .catch(e => console.log(e));
}

export const createBolo = (data) => dispatch => {
    const { type, boloDescription, plate, color, name } = data;
    handleRequest("/global/add-bolo", "POST", { type, description: boloDescription, plate, color, name })
        .then((res) => {
            if (res.data.msg === 'Added') {
                socket.emit("updateBolos")
                dispatch({ type: CREATE_BOLO, bolos: getBolos })
            }
        })
        .catch((err) => console.log(err));
}