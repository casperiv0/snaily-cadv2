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
const adminAuth = require("../../../auth/adminAuth");

/*
    @Route /ethnicities/
    @Auth Protected
*/
router.get("/", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `ethnicities`")
        .then((ethnicities) => {
            return res.json({ ethnicities: ethnicities})
        })
        .catch(err => console.log(err));
});

/*
    @Route /ethnicities/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { ethnicity } = req.body;
    processQuery("INSERT INTO `ethnicities` (`name`) VALUES (?)", [ethnicity])
        .then(() => {
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
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
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;