/*
    GET / - all admin data
    GET /action-logs - show all action logs
    DELETE /delete-all-citizens
    DELETE /manage-companies/:companyId
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const createAuditLog = require("../../utils/createAuditLog");

/*
    @Route /admin/
    @Auth Protected
*/
router.get("/", auth, async (req, res) => {
    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        const users = await processQuery("SELECT username FROM `users`").catch(err => console.log(err));
        const allCitizens = await processQuery("SELECT id FROM `citizens`").catch(err => console.log(err));
        const allWeapons = await processQuery("SELECT id FROM `registered_weapons`").catch(err => console.log(err));
        const allVehicles = await processQuery("SELECT id FROM `registered_cars`").catch(err => console.log(err));
        const allTickets = await processQuery("SELECT id FROM `leo_tickets`").catch(err => console.log(err));
        const allArrestReports = await processQuery("SELECT id FROM `arrest_reports`").catch(err => console.log(err));
        const allCompanies = await processQuery("SELECT id FROM `businesses`").catch(err => console.log(err));
        const allCompanyPosts = await processQuery("SELECT id FROM `posts`").catch(err => console.log(err));
        const allBolos = await processQuery("SELECT id FROM `bolos`").catch(err => console.log(err));

        return res.json({
            users: users,
            citizens: allCitizens,
            weapons: allWeapons,
            vehicles: allVehicles,
            tickets: allTickets,
            arrestReports: allArrestReports,
            companies: allCompanies,
            posts: allCompanyPosts,
            bolos: allBolos
        })
    } else {
        return res.sendStatus(403);
    };
});


/*
    @Route /admin/action-logs
    @Auth Protected
*/
router.get("/action-logs", auth, (req, res) => {
    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {

        processQuery("SELECT * FROM `action_logs` ORDER BY `id` DESC")
            .then(logs => {
                return res.json({ action_logs: logs });
            })
            .catch(err => console.log(err));
    } else {
        res.sendStatus(403);
    };
});


/*
    @Route /admin/delete-all-citizens
    @Auth Protected
*/
router.delete("/delete-all-citizens", auth, (req, res) => {

    if (req.user.rank === "owner") {
        // send to action logs
        processQuery("INSERT INTO `action_logs` (`action_title`, `date`) VALUES (?, ?)", [new Date().toLocaleDateString(), `All Citizens were deleted by ${req.user.username}.`]).catch(err => console.log(err));

        processQuery("DELETE FROM `citizens`")
            .then(() => {
                createAuditLog(`All citizens were deleted by ${req.user.username}`)
                return res.json({ msg: "Deleted All citizens" });
            })
            .catch(err => console.log(err))
    } else {
        return res.sendStatus(403);
    };
});


/*
    @Route /admin/manage-companies/:companyId
    @Auth Protected
*/
router.delete("/manage-companies/:companyId", auth, async (req, res) => {
    const companyId = req.params.companyId;

    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        processQuery("DELETE FROM `businesses` WHERE `id` = ?", companyId)
            .then(() => {
                createAuditLog(`A company was deleted ${req.user.username}`)
                return res.json({ msg: "Company Deleted" });
            })
            .catch(err => console.log(err));
    } else {
        res.sendStatus(403);
    };
});



module.exports = router;