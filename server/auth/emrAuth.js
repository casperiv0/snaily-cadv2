const { processQuery } = require("../utils/db");


async function emrAuth(req, res, next) {
    const user = await processQuery("SELECT dispatch, leo FROM `users` WHERE `id` = ?", [req.user.id]);

    // Check if the user has EMS/FD Permissions
    if (user[0].dispatch === "yes" || user[0].leo === "yes") {
        // User has access
        next();
    } else {
        // User doesn't have access
        return res.sendStatus(403)
    }
}


module.exports = emrAuth;