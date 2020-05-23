/*
    GET /:citizenId-:full_name/edit-licenses - edit licenses
    POST /:citizenId-:full_name/edit-licenses - edit licenses
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");

/*
    @Route /:citizenId/edit-licenses
    @Auth Protected
*/
router.get("/:citizenId/edit", auth, async (req, res) => {
    const current = await processQuery("SELECT dmv, pilot_license, fire_license, ccw FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);
    const licenses = await processQuery("SELECT * FROM `in_statuses`");

    return res.json({ current: current, licenses: licenses });
});


/*
    @Route /:citizenId-:full_name/edit-licenses
    @Auth Protected
*/
router.post("/:citizenId/edit", auth, (req, res) => {
    const { dmv, pilotLicense, firearmsLicense, ccw } = req.body;

    if (dmv, pilotLicense, firearmsLicense, ccw) {
        processQuery("UPDATE `citizens` SET `dmv` = ?, `pilot_license` = ?, `fire_license` = ?, `ccw` = ? WHERE `citizens`.`id` = ?", [dmv, pilotLicense, firearmsLicense, ccw, req.params.citizenId])
            .then(() => {
                return res.json({msg: "Updated"});
            })
            .catch(err => console.log(err));
    } else {
        return res.json({msg: "Please fill in all the fields!"});
    };
});


module.exports = router;