import { GET_BOLOS, CREATE_BOLO, REMOVE_BOLO } from "./types"
import { backendURL } from "../config/config";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";
const socket = io(backendURL);

export const getBolos = () => dispatch => {
    axios({
        url: backendURL + '/global/bolos',
        method: 'GET',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    })
        .then((res) => {
            dispatch({ type: GET_BOLOS, bolos: res.data.bolos });
        })
        .catch((err) => console.log(err));
}

export const removeBolo = (boloId) => dispatch => {
    axios({
        url: backendURL + '/global/bolos/' + boloId,
        method: 'DELETE',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
    }).then((res) => {
        if (res.data.msg === 'Deleted Bolo') {
            socket.emit("updateBolos")
            dispatch({ type: REMOVE_BOLO, bolos: getBolos })
        }
    });
}

export const createBolo = (data) => dispatch => {
    const { type, boloDescription, plate, color, name } = data;
    axios({
        url: backendURL + '/global/add-bolo',
        method: 'POST',
        headers: {
            'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            type: type,
            description: boloDescription,
            plate: plate,
            color: color,
            name: name
        },
    })
        .then((res) => {
            if (res.data.msg === 'Added') {
                socket.emit("updateBolos")
                dispatch({ type: CREATE_BOLO, bolos: getBolos })
            }
        })
        .catch((err) => console.log(err));
}