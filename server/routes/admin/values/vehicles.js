/*
    GET / - shows all vehicles
    POST /add - add a vehicle
    GET /edit/:vehicleId - shows info about a vehicle
    PUT /edit/:vehicleId - update vehicle
    DELETE /:vehicleId - delete vehicle
*/

const router = require("express").Router();
const auth = require("../../../auth/tokenAuth");
const { processQuery } = require("../../../utils/db");
const { adminAuth } = require("../../../auth/authFunctions");
const createAuditLog = require("../../../utils/createAuditLog");


/*
    @Route /vehicles/
    @Auth Protected
*/
router.get("/", auth, async (req, res) => {
    const defaultVehicles = await processQuery("SELECT * FROM `vehicles` WHERE `default_car` = ?", ['true']);
    const nonDefaultVehicles = await processQuery("SELECT * FROM `vehicles` WHERE `default_car` = ?", ['false']);

    return res.json({ defaultVehicles: defaultVehicles, nonDefaultVehicles: nonDefaultVehicles });
});

/*
    @Route /vehicles/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { vehicle } = req.body;
    processQuery("INSERT INTO `vehicles` (`cname`, `default_car`) VALUES (?, ?)", [vehicle, "false"])
        .then(() => {
            createAuditLog(`Vehicle ${vehicle} was added by ${req.user.username}`)
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /vehicles/edit/:vehicleId
    @Auth Protected
*/
router.get("/edit/:vehicleId", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `vehicles` WHERE id = ? ", [req.params.vehicleId])
        .then((vehicle) => {
            return res.json({ vehicle: vehicle });
        })
        .catch(err => console.log(err));
});

/*
    @Route /vehicles/edit/:vehicleId
    @Auth Protected
*/
router.put("/edit/:vehicleId", auth, adminAuth, (req, res) => {
    const { vehicle } = req.body;

    processQuery("UPDATE `vehicles` SET `cname` = ? WHERE `vehicles`.`id` = ?", [vehicle, req.params.vehicleId])
        .then(() => {
            createAuditLog(`Vehicle ${vehicle} was edited by ${req.user.username}`)
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /vehicles/:vehicleId
    @Auth Protected
*/
router.delete("/:vehicleId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `vehicles` WHERE `vehicles`.`id` = ?", [req.params.vehicleId])
        .then(() => {
            createAuditLog(`A vehicle was deleted by ${req.user.username}`)
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;