/*
    GET / - shows all legal statuses
    POST /add - add a legal status
    GET /edit/:legalId - shows info about a legal status
    PUT /edit/:legalId - update legal status
    DELETE /:legalId - delete legal status
*/

const router = require("express").Router();
const auth = require("../../../auth/tokenAuth");
const { processQuery } = require("../../../utils/db");
const adminAuth = require("../../../auth/adminAuth");

/*
    @Route /legal-statuses/
    @Auth Protected
*/
router.get("/", auth, (req, res) => {
    processQuery("SELECT * FROM `in_statuses`")
        .then((statuses) => {
            return res.json({ statuses: statuses})
        })
        .catch(err => console.log(err));
});

/*
    @Route /legal-statuses/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { legalStatus } = req.body;
    processQuery("INSERT INTO `in_statuses` (`status`) VALUES (?)", [legalStatus])
        .then(() => {
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /legal-statuses/edit/:legalId
    @Auth Protected
*/
router.get("/edit/:legalId", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `in_statuses` WHERE id = ? ", [req.params.legalId])
        .then((legalStatus) => {
            return res.json({ legalStatus: legalStatus });
        })
        .catch(err => console.log(err));
});

/*
    @Route /legal-statuses/edit/:legalId
    @Auth Protected
*/
router.put("/edit/:legalId", auth, adminAuth, (req, res) => {
    const { legalStatus } = req.body;

    processQuery("UPDATE `in_statuses` SET `status` = ? WHERE `in_statuses`.`id` = ?", [legalStatus, req.params.legalId])
        .then(() => {
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /legal-statuses/:legalId
    @Auth Protected
*/
router.delete("/:legalId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `in_statuses` WHERE `in_statuses`.`id` = ?", [req.params.legalId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;