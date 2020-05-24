/*
    GET / - shows all ems/fd deputies of user
    POST /add - add an ems/fd deputy
    GET /search/:citizenName - shows all medical records of citizen
    PUT /status/:status - update status
    DELETE /:deputyId - delete deputy
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
// emsFDAuth is to check if user has EMS_FD permissions
const emsFDAuth = require("../../auth/ems-fdAuth");

/*
    @Route /ems-fd/
    @Auth Protected
*/
router.get("/", auth, emsFDAuth, async (req, res) => {

    const deputies = await processQuery("SELECT * FROM `ems-fd` WHERE `linked_to` = ?", [req.user.username]).catch(err => console.log(err));

    return res.json({ deputies: deputies });
});


/*
    @Route /ems-fd/add
    @Auth Protected
*/
router.post("/add", auth, emsFDAuth, async (req, res) => {
    const { deputyName } = req.body;

    if (deputyName) {
        // Insert into database
        processQuery("INSERT INTO `ems-fd` (`name`, `linked_to`, `status`, `status2`) VALUES (?, ?, ?, ?)", [deputyName, req.user.username, "", "10-7"])
            .then(() => {
                return res.json({ msg: "Added Deputy" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields" });
    };
});

/* 
    @Route /ems-fd/search/:citizenName
    @Auth Protected
*/
router.get("/search/:citizenName", auth, emsFDAuth, (req, res) => {
    processQuery("SELECT * FROM `medical_records` WHERE `name` = ?", [req.params.citizenName])
        .then(medicalRecords => {
            return res.json({ medicalRecords: medicalRecords });
        })
        .catch(err => console.log(err));
})


/*
    @Route /ems-fd/status/:status
    @Auth Protected
*/
router.put("/status/:deputyId", auth, emsFDAuth, async (req, res) => {
    const status = req.body.status;
    const deputyId = req.params.deputyId;

    processQuery("UPDATE `ems-fd` SET `status2` = ? WHERE `id` = ?", [status, deputyId])
        .then(() => {
            return res.json({ msg: 'Updated Status' });
        })
        .catch(err => console.log(err));
});

/*
    @Route /ems-fd/:deputyId
    @Auth Protected
*/
router.delete("/:deputyId", auth, emsFDAuth, (req, res) => {
    processQuery("DELETE FROM `ems-fd` WHERE `ems-fd`.`id` = ?", [req.params.deputyId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});

module.exports = router;