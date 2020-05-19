/*
    POST /register - register vehicle
    GET /:carId-:plate/edit - edit vehicle
    POST /:carId-:plate/edit - edit vehicle
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*  
    @Route /register
    @Auth Protected
*/
router.post("/register", auth, async (req, res) => {
    const { plate, owner, vehicle, status, color, companies } = req.body;


    if (plate && owner && vehicle && status && color) {

        const citizen = await processQuery("SELECT vehicle_reg, rank FROM `citizens` WHERE `full_name` = ?", [owner]);
        const plate2 = await processQuery("SELECT * FROM `registered_vehicles` WHERE  `plate` = ?", [plate]);
        const vinNumber = () => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 17; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }


        // check if plate is already in use
        if (plate2[0]) {
            return res.json({ msg: "Plate is already in use!" });
        };


        if (companies !== "") {
            if (citizen[0].vehicle_reg === "true" || citizen[0].rank === "owner" || citizen[0].rank === "manager") {
                processQuery("INSERT INTO `registered_vehicles` (`owner`, `vehicle`, `vin_number`, `in_status`, `plate`, `color`, `linked_to`, `company`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [owner, vehicle, vinNumber(17), status, plate, color, req.user.username, companies])
                    .then(() => {
                        return res.json({ msg: "Registered" });
                    })
                    .catch(err => console.log(err));
            } else {
                return res.json({ msg: "You're not allowed to register a vehicle for your company!" })
            }
        } else {
            processQuery("INSERT INTO `registered_vehicles` (`owner`, `vehicle`, `vin_number`, `in_status`, `plate`, `color`, `linked_to`, `company`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [owner, vehicle, vinNumber(17), status, plate, color, req.user.username, ""])
                .then(() => {
                    return res.json({ msg: "Registered" });
                })
                .catch(err => console.log(err));
        }

    } else {
        return res.json({ msg: "please fill in all fields" });
    };
});


/*
    @Route /:carId-:plate/edit
    @Auth Protected
*/
router.get("/:carId-:plate/edit", auth, async (req, res) => {
    const vehicle = await processQuery("SELECT * FROM `registered_vehicles` WHERE `id` = ?", [req.params.carId]);


});



router.post("/")

module.exports = router;