import Cookies from 'js-cookie';


export const getSession = () => {
    const jwt = Cookies.get('__session')
    let session
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            // what is window.atob ?
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
            session = JSON.parse(window.atob(base64));            
            if (session === "Invalid Token") {
                window.location = "/auth/login"
            }
            
        }
    } catch (error) {
        console.log(error)
    }
    return session;
};


export const logIn = () => {
    const jwtToken = sessionStorage.getItem("token");
    Cookies.set("__session", jwtToken);
};

export const logOut = () => {
    Cookies.remove('__session');
    window.location = "/"
}
