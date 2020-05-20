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
const adminAuth = require("../../../auth/adminAuth");

/*
    @Route /vehicles/
    @Auth Protected
*/
router.get("/", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `vehicles`")
        .then((vehicles) => {
            return res.json({ vehicles: vehicles})
        })
        .catch(err => console.log(err));
});

/*
    @Route /vehicles/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { vehicle } = req.body;
    processQuery("INSERT INTO `vehicles` (`cname`, `default_car`) VALUES (?, ?)", [vehicle, "false"])
        .then(() => {
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
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;