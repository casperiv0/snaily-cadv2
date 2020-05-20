/*
    GET / - shows all data for the police dashboard
    GET /penal-codes - shows all the penal codes
    GET /myofficers - shows all officers linked to the loggedin account
    POST /add - add an officer
    DELETE /:officerId - delete an officer

*/

const router = require("express").Router();
const fs = require("fs");
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const officerAuth = require("../../auth/officerAuth");

/*
    @Route /officers
    @Auth Protected
*/
router.get("/", auth, officerAuth, (req, res) => {



});


/*
    @Route /officers/penal-codes
    @Auth Protected
*/
router.get("/penal-codes", auth, officerAuth, (req, res) => {
    const rawPenalCodes = fs.readFileSync(__dirname + "/penal-codes.json");
    const penalCodes = JSON.parse(rawPenalCodes);
    return res.json({ penalCodes });
});

/*
    @Route /officers/myofficers
    @Auth Protected
*/
router.get("/myofficers", auth, officerAuth, (req, res) => {
    processQuery("SELECT * FROM `officers` WHERE linked_to = ?", [req.user.username])
        .then(officers => {
            return res.json({ officers });
        })
        .catch(err => console.log(err));
});

/*
    @Route /officers/add
    @Auth Protected
    @Extra note: departments come from /departments
*/
router.post("/add", auth, officerAuth, (req, res) => {
    const { officerName, officerDept } = req.body;

    if (officerName, officerDept) {
        processQuery("INSERT INTO `officers` ( `officer_name`,`officer_dept`,`linked_to`,`status`,`status2`) VALUES (?, ?, ?, ?, ?)",
            [officerName, officerDept, req.user.username, "off-duty", ""])
            .then(() => {
                return res.json({ msg: "Added" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    };

});


module.exports = router;