import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'


export const getSession = () => {
    const jwt = Cookies.get('__session')
    let session
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            // what is window.atob ?
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
            session = JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log(error)
    }
    return session
}

export const logIn = () => {
    const jwtToken = sessionStorage.getItem("token")
    const sessionToken = Cookies.set("__session", jwtToken);

    console.log(sessionToken);
    console.log(jwtToken);
};

export const logOut = () => {
    Cookies.remove('__session');
    window.location = "/"
}