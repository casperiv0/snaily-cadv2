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
const { adminAuth } = require("../../../auth/authFunctions");
const createAuditLog = require("../../../utils/createAuditLog");


/*
    @Route /weapons/
    @Auth Protected
*/
router.get("/", auth, async (req, res) => {
    // Soon
    const defaultWeapons = await processQuery("SELECT * FROM `weapons` WHERE `default_weapon` = ?", ["true"]).catch(err => console.log(err));
    const nonDefaultWeapons = await processQuery("SELECT * FROM `weapons`", ["false"]).catch(err => console.log(err));
    const weapons = await processQuery("SELECT * FROM `weapons`").catch(e => console.log(e));

    return res.json({ defaultWeapons, nonDefaultWeapons, weapons });
});

/*
    @Route /weapons/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { weapon } = req.body;
    processQuery("INSERT INTO `weapons` (`name`, `default_weapon`) VALUES (?, ?)", [weapon, "false"])
        .then(() => {
            createAuditLog(`Weapon ${weapon} was added by ${req.user.username}`)
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
            createAuditLog(`Weapon ${weapon} was edited by ${req.user.username}`)
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
            createAuditLog(`A weapon deleted by ${req.user.username}`)
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;