const { processQuery } = require("../utils/db");


async function adminAuth(req, res, next) {
    const user = await processQuery("SELECT leo FROM `users` WHERE `id` = ?", [req.user.id]);

    // Check if the user has moderator+ Permissions
    if (user[0].leo === "yes") {
        // User has access
        next();
    } else {
        // User doesn't have access
        return res.sendStatus(403)
    }
}


module.exports = adminAuth;