const { processQuery } = require("../utils/db");


async function adminAuth(req, res, next) {
    const user = await processQuery("SELECT rank FROM `users` WHERE `id` = ?", [req.user.id]);

    // Check if the user has moderator+ Permissions
    if (user[0].rank === "moderator" || user[0].rank === "admin" || user[0].rank === "owner") {
        // User has access
        next();
    } else {
        // User doesn't have access
        return res.sendStatus(403)
    }
}


module.exports = adminAuth;