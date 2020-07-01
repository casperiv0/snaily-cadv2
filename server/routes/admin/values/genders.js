/*
    GET / - shows all genders
    POST /add - add a gender
    GET /edit/:genderId - shows info about a gender
    PUT /edit/:genderId - update gender
    DELETE /:genderId - delete gender
*/

const router = require("express").Router();
const auth = require("../../../auth/tokenAuth");
const { processQuery } = require("../../../utils/db");
const { adminAuth } = require("../../../auth/authFunctions");
const createAuditLog = require("../../../utils/createAuditLog");


/*
    @Route /genders/
    @Auth Protected - Only Needs a token, no Rank
*/
router.get("/", auth, (req, res) => {
    processQuery("SELECT * FROM `genders`")
        .then((genders) => {
            return res.json({ genders: genders })
        })
        .catch(err => console.log(err));
});

/*
    @Route /genders/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { gender } = req.body;
    processQuery("INSERT INTO `genders` (`name`) VALUES (?)", [gender])
        .then(() => {
            createAuditLog(`Gender ${gender} was added by ${req.user.username}`)
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /genders/edit/:genderId
    @Auth Protected
*/
router.get("/edit/:genderId", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `genders` WHERE id = ? ", [req.params.genderId])
        .then((gender) => {
            return res.json({ gender: gender });
        })
        .catch(err => console.log(err));
});

/*
    @Route /genders/edit/:genderId
    @Auth Protected
*/
router.put("/edit/:genderId", auth, adminAuth, (req, res) => {
    const { gender } = req.body;

    processQuery("UPDATE `genders` SET `name` = ? WHERE `genders`.`id` = ?", [gender, req.params.genderId])
        .then(() => {
            createAuditLog(`Gender ${gender} was edited by ${req.user.username}`)
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /genders/:genderId
    @Auth Protected
*/
router.delete("/:genderId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `genders` WHERE `genders`.`id` = ?", [req.params.genderId])
        .then(() => {
            createAuditLog(`A gender was deleted by ${req.user.username}`)
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;