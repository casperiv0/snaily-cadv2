/*
    GET /get-status/:officerId - shows current status for officer
    GET /penal-codes - shows all the penal codes
    GET /myofficers - shows all officers linked to the loggedin account
    POST /add - add an officer
    DELETE /:officerId - delete an officer

    POST /create-ticket
    POST /create-arrest-report
    POST /create-written-warning
    POST /create-warrant

    GET /search/:citizenName
    GET /search/:serialNumber
    GET /search/:plate
*/

const router = require("express").Router();
const fs = require("fs");
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const {officerAuth} = require("../../auth/authFunctions");

/*
    @Route /officers
    @Auth Protected
*/
router.get("/get-status/:officerId", auth, officerAuth, async (req, res) => {
    processQuery("SELECT * FROM `officers` WHERE `id` = ?", [req.params.officerId]).then((officer) => {
        return res.json({ officer: officer[0] })
    }).catch(err => console.log(err));
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
router.post("/myofficers/add", auth, officerAuth, (req, res) => {
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
    @Route /myofficers/:officerId
    @Auth Protected
*/
router.delete("/myofficers/del/:officerId", auth, officerAuth, (req, res) => {
    const { officerId } = req.params;

    processQuery("DELETE FROM `officers` WHERE `id` = ?", [officerId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /officers/add-ticket
    @Auth Protected
    @Extra Database name is changed from `posted_charges` TO `leo_tickets`
    @Extra `charge` is changed to `violations`
    @Extra `ticket_amount` was removed
*/
router.post("/create-ticket", auth, officerAuth, async (req, res) => {
    const { name, violations, officer_name } = req.body;
    const postal = req.body.postal.toString();
    const date = new Date().toLocaleDateString();

    let { notes } = req.body;
    if (notes === "") {
        notes = "Not Specified";
    };

    if (name && violations && officer_name) {

        processQuery("INSERT INTO `leo_tickets` (`name`, `violations`, `officer_name`, `date`, `postal`, `notes`) VALUES (?, ?, ?, ?, ?, ?)", [name, violations, officer_name, date, postal, notes])
            .then(() => {
                return res.json({ msg: "Added" })
            }).catch(err => console.log(err));

    } else {
        return res.json({ msg: "Name, violations and officer name are required!" });
    };
});


/*
    @Route /officers/add-arrest-report
    @Auth Protected
    @Extra `name` is changed to `arrestee_name`
*/
router.post("/create-arrest-report", auth, officerAuth, (req, res) => {
    const { arresteeName, charges, officer_name, postal } = req.body;
    const date = new Date().toLocaleDateString();

    let { notes } = req.body;
    if (notes === "") {
        notes = "Not Specified";
    };

    if (arresteeName && charges && officer_name) {
        processQuery("INSERT INTO `arrest_reports` (`arrestee_name`, `date`, `charges`, `officer_name`, `notes`, `postal`) VALUES (?, ?, ?, ?, ?, ?)",
            [arresteeName, date, charges, officer_name, notes, postal])
            .then(() => {
                return res.json({ msg: "Added" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Arrestee name, Charges and officer name are required" })
    }

});

/*
    @Route /officers/add-written-warning
    @Auth Protected
*/
router.post("/create-written-warning", auth, officerAuth, (req, res) => {
    const { name, officer_name, infractions, postal } = req.body;
    const date = new Date().toLocaleDateString();

    let { notes } = req.body;
    if (notes === "") {
        notes = "Not Specified";
    };

    if (name && officer_name && infractions) {
        processQuery("INSERT INTO `written_warnings` (`name`, `date`, `infractions`, `officer_name`, `notes`, `postal`) VALUES (?, ?, ?, ?, ?, ?)",
            [name, date, infractions, officer_name, notes, postal])
            .then(() => {
                return res.json({ msg: "Added" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Name, Officer name and infractions are required" });
    }


});

/*
    @Route /officers/create-warrant
    @Auth Protected
*/
router.post("/create-warrant", auth, officerAuth, (req, res) => {
    const { fullName, status, details } = req.body;

    if (fullName && status) {
        processQuery("INSERT INTO `warrants` (`name`, `reason`, `status`) VALUES (?, ?, ?)",
            [fullName, details, status])
            .then(() => {
                return res.json({ msg: "Added" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Name and status are required" });
    }
});


/*
    @Route /officers/search/:citizenName
    @Auth Protected
*/
router.get("/search/name/:citizenName", auth, officerAuth, async (req, res) => {
    const { citizenName } = req.params;

    const citizen = await processQuery("SELECT * FROM `citizens` WHERE `full_name` = ?", [citizenName]);

    if (!citizen[0]) return res.json({ msg: "Citizen Not Found" });

    const warrants = await processQuery("SELECT * FROM `warrants` WHERE `name` = ?", [citizenName]);
    const tickets = await processQuery("SELECT * FROM `leo_tickets` WHERE `name` = ?", [citizenName]);
    const arrest_reports = await processQuery("SELECT * FROM `arrest_reports` WHERE `arrestee_name` = ?", [citizenName]);
    const written_warnings = await processQuery("SELECT * FROM `written_warnings` WHERE `name` = ?", [citizenName]);
    const vehicles = await processQuery("SELECT * FROM `registered_cars` WHERE `owner` = ?", [citizenName]);
    const weapons = await processQuery("SELECT * FROM `registered_weapons` WHERE `owner` = ?", [citizenName]);

    return res.json({ citizen, warrants, tickets, arrestReports: arrest_reports, writtenWarnings: written_warnings, weapons, vehicles });
})

/*
    @Route /officers/search/plate/:plate
    @Auth Protected
*/
router.get("/search/plate/:plate", auth, officerAuth, async (req, res) => {
    const { plate } = req.params;

    const foundPlate = await processQuery("SELECT * FROM `registered_cars` WHERE `plate` = ?", [plate]);


    if (!foundPlate[0]) return res.json({ msg: "Plate Not Found" });


    return res.json({ plate: foundPlate });
})

/*
    @Route /officers/search/weapon/:serialNumber
    @Auth Protected
*/
router.get("/search/weapon/:serialNumber", auth, officerAuth, async (req, res) => {
    const { serialNumber } = req.params;

    // check if weapon exists
    const foundWeapon = await processQuery("SELECT * FROM `registered_weapons` WHERE `serial_number` = ?", [serialNumber]);
    if (!foundWeapon[0]) return res.json({ msg: "Weapon Not Found" });

    return res.json({ weapon: foundWeapon });
})



module.exports = router;