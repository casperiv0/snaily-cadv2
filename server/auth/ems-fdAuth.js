const { processQuery } = require("../utils/db");


async function emsFDAuth(req, res, next) {
    const user = await processQuery("SELECT ems_fd FROM `users` WHERE `id` = ?", [req.user.id]);

    // Check if the user has EMS/FD Permissions
    if (user[0].ems_fd === "yes") {
        // User has access
        next();
    } else {
        // User doesn't have access
        return res.sendStatus(403)
    }
}


module.exports = emsFDAuth;