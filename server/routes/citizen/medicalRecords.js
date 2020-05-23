/*
    GET /:citizenName - shows all medical records for EMS only
    POST /:citizenId/add - add medical record
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*
    @Route /:citizenName
    @Auth Protected
*/
router.get("/:citizenName", auth, async (req, res) => {
    processQuery("SELECT * FROM `medical_records` WHERE `name` = ?", [req.params.citizenName])
        .then(records => {
            return res.json({ records: records });
        })
        .catch(err => console.log(err));
});


/*
    @Route /:citizenId/add
    @Auth Protected
*/
router.post("/:citizenId-:citizenName/add", auth, (req, res) => {
    const { type, shortInfo } = req.body;

    if (type, shortInfo) {
        processQuery("INSERT INTO `medical_records` (`type`, `short_info`, `name`) VALUES (?, ?, ?)", [type, shortInfo, req.params.citizenName])
            .then(() => { return res.json({ msg: "Record Added" }) })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    }
});


module.exports = router;