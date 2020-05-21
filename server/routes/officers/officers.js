/*
    GET / - shows all data for the police dashboard
    GET /penal-codes - shows all the penal codes
    GET /myofficers - shows all officers linked to the loggedin account
    POST /add - add an officer
    DELETE /:officerId - delete an officer

    POST /add-ticket
    POST /add-arrest-report
    POST /add-written-warning

    GET /search/:citizenName
    GET /search/:serialNumber
    GET /search/:plate
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
router.get("/", auth, officerAuth, async (req, res) => {
    const bolos = await processQuery("SELECT * FROM `bolos`");
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


/*
    @Route /officers/add-ticket
    @Auth Protected
    @Extra Database name is changed from `posted_charges` TO `tickets`
    @Extra `charge` is changed to `violations`
    @Extra `ticket_amount` was removed
*/
router.post("/add-ticket", auth, officerAuth, async (req, res) => {
    const { name, violations, officer_name } = req.body;
    const postal = req.body.postal.toString();
    const date = new Date().toLocaleDateString();

    let { notes } = req.body;
    if (notes === "") {
        notes = "Not Specified";
    };

    if (name, violations, officer_name, postal) {

        processQuery("INSERT INTO `leo_tickets` (`name`, `violations`, `officer_name`, `date`, `postal`, `notes`) VALUES (?, ?, ?, ?, ?, ?)", [name, violations, officer_name, date, postal, notes])
            .then(() => {
                return res.json({ msg: "Added" })
            })

    } else {
        return res.json({ msg: "Please fill in all required fields" });
    };
});


/*
    @Route /officers/add-arrest-report
    @Auth Protected
    @Extra `name` is changed to `arrestee_name`
*/
router.post("/add-arrest-report", auth, officerAuth, (req, res) => {
    const { arresteeName, charges, officer_name, postal } = req.body;
    const date = new Date().toLocaleDateString();

    let { notes } = req.body;
    if (notes === "") {
        notes = "Not Specified";
    };

    processQuery("INSERT INTO `arrest_reports` (`arrestee_name`, `date`, `charges`, `officer_name`, `notes`, `postal`) VALUES (?, ?, ?, ?, ?, ?)",
        [arresteeName, date, charges, officer_name, notes, postal])
        .then(() => {
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /officers/add-written-warning
    @Auth Protected
*/
router.post("/add-written-warning", auth, officerAuth, (req, res) => {
    const { name, officer_name, infractions, postal } = req.body;
    const date = new Date().toLocaleDateString();

    let { notes } = req.body;
    if (notes === "") {
        notes = "Not Specified";
    };

    processQuery("INSERT INTO `written_warnings` (`name`, `date`, `infractions`, `officer_name`, `notes`, `postal`) VALUES (?, ?, ?, ?, ?, ?)",
        [name, date, infractions, officer_name, notes, postal])
        .then(() => {
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /officers/search/:citizenName
    @Auth Protected
*/
router.get("/search/:citizenName", auth, officerAuth, async (req, res) => {
    const { citizenName } = req.params;

    const citizen = await processQuery("SELECT * FROM `citizens` WHERE `full_name` = ?", [citizenName]);

    if (!citizen[0]) return res.json({ msg: "Citizen Not Found" });

    const warrants = await processQuery("SELECT * FROM `warrants` WHERE `name` = ?", [citizenName]);
    const tickets = await processQuery("SELECT * FROM `leo_tickets` WHERE `name` = ?", [citizenName]);
    const arrest_reports = await processQuery("SELECT * FROM `arrest_reports` WHERE `arrestee_name` = ?", [citizenName]);
    const written_warnings = await processQuery("SELECT * FROM `written_warnings` WHERE `name` = ?", [citizenName]);

    return res.json({ warrants, tickets, arrestReports: arrest_reports, writtenWarnings: written_warnings });
})


module.exports = router;