/*
    GET / - shows all ethnicities
    POST /add - add a ethnicity
    GET /edit/:ethnicityId - shows info about an ethnicity
    PUT /edit/:ethnicityId - update ethnicity
    DELETE /:ethnicityId - delete ethnicity
*/

const router = require("express").Router();
const auth = require("../../../auth/tokenAuth");
const { processQuery } = require("../../../utils/db");
const { adminAuth } = require("../../../auth/authFunctions");
const createAuditLog = require("../../../utils/createAuditLog");

/*
    @Route /ethnicities/
    @Auth Protected - Only Needs a token, no Rank
*/
router.get("/", auth, (req, res) => {
    processQuery("SELECT * FROM `ethnicities`")
        .then((ethnicities) => {
            return res.json({ ethnicities: ethnicities })
        })
        .catch(err => console.log(err));
});

/*
    @Route /ethnicities/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { ethnicity } = req.body;

    if (ethnicity) {
        processQuery("INSERT INTO `ethnicities` (`name`) VALUES (?)", [ethnicity])
            .then(() => {
                createAuditLog(`Ethnicity ${ethnicity} was added by ${req.user.username}`);
                return res.json({ msg: "Added" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields" })
    }

});

/*
    @Route /ethnicities/edit/:ethnicityId
    @Auth Protected
*/
router.get("/edit/:ethnicityId", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `ethnicities` WHERE id = ? ", [req.params.ethnicityId])
        .then((ethnicity) => {
            return res.json({ ethnicity: ethnicity });
        })
        .catch(err => console.log(err));
});

/*
    @Route /ethnicities/edit/:ethnicityId
    @Auth Protected
*/
router.put("/edit/:ethnicityId", auth, adminAuth, (req, res) => {
    const { ethnicity } = req.body;

    processQuery("UPDATE `ethnicities` SET `name` = ? WHERE `ethnicities`.`id` = ?", [ethnicity, req.params.ethnicityId])
        .then(() => {
            createAuditLog(`Ethnicity ${ethnicity} was edited by ${req.user.username}`);
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /ethnicities/:ethnicityId
    @Auth Protected
*/
router.delete("/:ethnicityId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `ethnicities` WHERE `ethnicities`.`id` = ?", [req.params.ethnicityId])
        .then(() => {
            createAuditLog(`An ethnicity was deleted by ${req.user.username}`);
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;