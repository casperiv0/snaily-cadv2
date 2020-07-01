import axios from "axios";
import { backendURL } from "./config/config";
import Cookies from "js-cookie";

/**
 * @param {string} path
 * @param {string} method
 * @param {Object} data
 */
export const handleRequest = (path, method, data) => {
    return axios({
        url: `${backendURL}${path}`,
        method: method,
        data: data ? data : null,
        headers: {
            "x-auth-snailycad-token": Cookies.get("__session"),
        }
    });
}