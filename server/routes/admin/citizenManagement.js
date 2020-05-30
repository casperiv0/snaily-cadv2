/*
    GET / - shows all citizens
    GET /edit/:citizenId - shows info about that citizen
    PUT /edit/:citizenId - edit citizen
    DELETE /:citizenId - delete citizen
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const createAuditLog = require("../../utils/createAuditLog");



/*
    @Route /admin/citizens
    @Auth Protected
*/
router.get("/", auth, async (req, res) => {
    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        processQuery("SELECT * FROM `citizens`")
            .then(citizens => {
                return res.json({ citizens: citizens });
            })
            .catch(err => console.log(err));
    } else {
        return res.sendStatus(403);
    };
});


/*
    @Route /admin/edit/:citizenId
    @Auth Protected
*/
router.get("/edit/:citizenId", auth, async (req, res) => {
    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        const citizenId = req.params.citizenId;

        const citizen = await processQuery("SELECT * FROM `citizens` WHERE `citizens`.`id` = ?", [citizenId]);

        // Check if citizen exists
        if (!citizen[0]) return res.json({ msg: "Citizen wasn't found!" });

        const genders = await processQuery("SELECT * FROM `genders`");
        const ethnicities = await processQuery("SELECT * FROM `ethnicities`");

        return res.json({ citizen: citizen, genders: genders, ethnicities: ethnicities });
    } else {
        res.sendStatus(403);
    };
});



/*
    @Route /admin/edit/:citizenId
    @Auth Protected
*/
router.put("/edit/:citizenId", auth, async (req, res) => {
    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        const citizenId = req.params.citizenId;
        const { birth, gender, ethnicity, hairColor, eyeColor, address, weight, height } = req.body;

        processQuery('UPDATE `citizens` SET `birth` = ?, `gender` = ?, `ethnicity` = ?, `hair_color` = ?, `eye_color` = ?, `address` = ?, `height` = ?, `weight` = ? WHERE `citizens`.`id` = ?',
            [birth, gender, ethnicity, hairColor, eyeColor, address, height, weight, citizenId])
            .then(() => {
                createAuditLog(`Citizen with Id ${citizenId} was edited by ${req.user.username}`)
                return res.json({ msg: "Updated Citizen" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    };
});


/*
    @Route /admin/:citizenId
    @Auth Protected
*/
router.delete("/:citizenId", auth, async (req, res) => {
    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        const citizenId = req.params.citizenId;
        processQuery("DELETE FROM `citizens` WHERE `citizens`.`id` = ?", [citizenId])
            .then(() => {
                createAuditLog(`A citizen was deleted by ${req.user.username}`)
                return res.json({ msg: "Citizen Deleted" });
            })
            .catch(err => console.log(err));
    } else {
        res.sendStatus(403);
    };
});

module.exports = router;