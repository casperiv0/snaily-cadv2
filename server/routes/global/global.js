/*
    GET /911calls - shows all 911 calls
    GET /tow - shows all tow calls
    POST /create-911-call - create 911 call
    POST /create-tow-call

    POST /add-bolo - add a bolo¨
    DELETE /bolo/:boloId - delete a bolo

    POST /suspend-dmv/:citizenId - suspend a drivers license

    POST /add-warrant - add a new warrant
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");

// This is to check if the user has the right permissions (dispatch or police)
const emrAuth = require("../../auth/emrAuth");


/*
    @Route /global/911calls
    @Auth Protected
*/
router.get("/911calls", auth, async (req, res) => {
    const user = await processQuery("SELECT rank, leo, ems_fd, dispatch FROM `users` WHERE `id` = ?", [req.user.id]);

    if (user[0].leo === "yes" || user[0].ems_fd === "yes" || user[0].dispatch === "yes") {

        processQuery("SELECT * FROM `911calls`")
            .then(calls => {
                return res.json({ calls: calls });
            })
            .catch(err => console.log(err));

    } else {
        return res.sendStatus(403);
    };
});


/*
    @Route /global/create-911-call
    @Auth Public
*/
router.post("/create-911-call", (req, res) => {
    const { description, caller, location } = req.body;

    if (description && caller && location) {
        processQuery("INSERT INTO `911calls` (`description`, `name`, `location`, `status`, `assigned_unit`) VALUES (?, ?, ?, ?, ?)",
            [description, caller, location, "Not Assigned", ""])
            .then(() => {
                return res.json({ msg: "911 was called" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    };
});


/*
    @Route /global/tow-calls
    @Auth Public
*/
router.get("/tow-calls", (req, res) => {
    processQuery("SELECT * FROM `tow_calls`")
        .then(calls => {
            return res.json({ towCalls: calls });
        })
        .catch(err => console.log(err));
});


/*
    @Route /global/create-tow-call
    @Auth Public
*/
router.post("/create-tow-call", (req, res) => {
    const { description, caller, location } = req.body;

    if (description && caller && location) {
        processQuery("INSERT INTO `tow_calls` (`description`, `name`, `location`) VALUES (?, ?, ?)", [description, caller, location])
            .then(() => {
                return res.json({ msg: "Tow Truckers Called" });
            })
            .catch(err => console.log(err));
    } else {
        res.json({ msg: "Please fill in all fields" });
    };
});


/*
    @Route /global/add-bolo
    @Auth Protected
*/
router.post("/add-bolo", auth, emrAuth, (req, res) => {
    const { description } = req.body
    processQuery("INSERT INTO `bolos` (`description`) VALUES (?)", description)
        .then(() => {
            return res.json({ msg: "Added bolo" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /global/bolo/:boloId
    @Auth Protected
*/
router.delete("/bolo/:boloId", auth, emrAuth, async (req, res) => {
    processQuery("DELETE FROM `bolos` WHERE `id` = ?", [req.params.boloId])
        .then(() => {
            return res.json({ msg: "Deleted Bolo" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /global/suspend-dmv/:citizenId
    @Auth Protected
*/
router.post("/suspend-dmv/:citizenId", auth, emrAuth, (req, res) => {
    processQuery("UPDATE `citizens` SET `dmv` = ? WHERE `citizens`.`id` = ?", ["Suspended", req.params.citizenId])
        .then(() => {
            return res.json({ msg: "Suspended License" });
        })
        .catch(err => console.log(err));
});


/*
    @Route /global/add-warrant
    @Auth Protected
*/
router.post("/add-warrant", auth, emrAuth, (req, res) => {
    const { reason, status, name } = req.body;

    if (reason && status && name) {
        processQuery("INSERT INTO `warrants` ( `name`, `reason`, `status`) VALUES (?, ?, ?)", [name, reason, status])
            .then(() => {
                return res.json({ msg: "Added Warrant" });
            })
            .catch(err => console.log(err));
    } else {
        res.json({ msg: "Please fill in all fields" });
    };
});

module.exports = router;