/*
    GET / - shows all weapons
    POST /add - add a weapon
    GET /edit/:weaponId - shows info about a weapon
    PUT /edit/:weaponId - update weapon
    DELETE /:weaponId - delete weapon
*/

const router = require("express").Router();
const auth = require("../../../auth/tokenAuth");
const { processQuery } = require("../../../utils/db");
const adminAuth = require("../../../auth/adminAuth");

/*
    @Route /weapons/
    @Auth Protected
*/
router.get("/", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `weapons`")
        .then((weapons) => {
            return res.json({ weapons: weapons})
        })
        .catch(err => console.log(err));
});

/*
    @Route /weapons/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { weapon } = req.body;
    processQuery("INSERT INTO `weapons` (`name`) VALUES (?)", [weapon])
        .then(() => {
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /weapons/edit/:weaponId
    @Auth Protected
*/
router.get("/edit/:weaponId", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `weapons` WHERE id = ? ", [req.params.weaponId])
        .then((weapon) => {
            return res.json({ weapon: weapon });
        })
        .catch(err => console.log(err));
});

/*
    @Route /weapons/edit/:weaponId
    @Auth Protected
*/
router.put("/edit/:weaponId", auth, adminAuth, (req, res) => {
    const { weapon } = req.body;

    processQuery("UPDATE `weapons` SET `name` = ? WHERE `weapons`.`id` = ?", [weapon, req.params.weaponId])
        .then(() => {
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /weapons/:weaponId
    @Auth Protected
*/
router.delete("/:weaponId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `weapons` WHERE `weapons`.`id` = ?", [req.params.weaponId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;