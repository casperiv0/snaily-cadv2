/*
    GET / - shows all data to edit from CAD
    PUT / - edit CAD
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");

/*
    @Route /admin/edit-cad/
    @Auth Protected
*/
router.get("/", auth, (req, res) => {
    if (req.user.rank === "owner") {
        processQuery("SELECT * FROM `cad_info`")
            .then(info => {
                return res.json({ info: info });
            })
            .catch(err => console.log(err));
    } else {
        res.sendStatus(403);
    };
});


/*
    @Route /admin/edit-cad/
    @Auth Protected
*/
router.put("/", auth, (req, res) => {
    if (req.user.rank === "owner") {
        const { cadName, newAop, whitelist, towWhitelist } = req.body;

        processQuery("UPDATE `cad_info` SET `cad_name` = ?, `AOP`= ?,`tow_whitelisted` = ?, `whitelisted` = ? ", [cadName, newAop, towWhitelist, whitelist])
            .then(() => {
                return res.json({ msg: "CAD Updated" });
            })
            .catch(err => console.log(err));
    } else {
        res.sendStatus(403);
    };
})

module.exports = router;