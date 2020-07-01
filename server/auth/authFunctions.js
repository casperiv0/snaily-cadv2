const { processQuery } = require("../utils/db");

// check for admin
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

// check for dispatch 
async function dispatchAuth(req, res, next) {
    const user = await processQuery("SELECT dispatch FROM `users` WHERE `id` = ?", [req.user.id]);

    // Check if the user has moderator+ Permissions
    if (user[0].dispatch === "yes") {
        // User has access
        next();
    } else {
        // User doesn't have access
        return res.sendStatus(403)
    }
}

// Check for dispatch & LEO
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

// check for ems-fd
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

async function officerAuth(req, res, next) {
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




module.exports = {
    adminAuth,
    dispatchAuth,
    emrAuth,
    emsFDAuth,
    officerAuth
}