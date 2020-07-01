const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config.js");


function auth(req, res, next) {
    const token = req.header("x-auth-snailycad-token");

    if (!token) return res.send("No token provided, Access Denied!");


    // check if token is valid
    try {
        const verifiedToken = jwt.verify(token, jwt_secret);

        req.user = verifiedToken;
    
        next();
    } catch {
        // Invalid token
        return res.json({msg: "Invalid Token"})
    }

};

module.exports = auth;