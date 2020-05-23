/*
    GET / - shows all vehicles linked to user
    POST /register - register vehicle
    GET /:carId-:plate - edit vehicle
    PUT /:carId-:plate - edit vehicle
    DELETE /:carId-:plate - edit vehicle
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*  
    @Route /register
    @Auth Protected
*/
router.get("/", auth, (req, res) =>{
    processQuery("SELECT * FROM `registered_cars` WHERE `linked_to` = ?", [req.user.username])
        .then(vehicles => {
            return res.json({vehicles});
        })
        .catch(err => console.log(err));
})


/*  
    @Route /register
    @Auth Protected
*/
router.post("/register", auth, async (req, res) => {
    const { plate, owner, vehicle, status, color, company } = req.body;

    if (plate && owner && vehicle && status && color) {

        // Check if plate is equal or shorter than 8
        if (plate.toString().length > 8) {
            return res.json({ msg: "Plate Can only be 8 characters long!" });
        }

        const citizen = await processQuery("SELECT vehicle_reg, rank FROM `citizens` WHERE `full_name` = ?", [owner]);
        const plate2 = await processQuery("SELECT * FROM `registered_cars` WHERE  `plate` = ?", [plate]);

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


        if (company !== "") {
            if (citizen[0].vehicle_reg === "true" || citizen[0].rank === "owner" || citizen[0].rank === "manager") {
                processQuery("INSERT INTO `registered_cars` (`owner`, `vehicle`, `vin_number`, `in_status`, `plate`, `color`, `linked_to`, `company`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [owner, vehicle, vinNumber(17), status, plate, color, req.user.username, company])
                    .then(() => {
                        return res.json({ msg: "Registered" });
                    })
                    .catch(err => console.log(err));
            } else {
                return res.json({ msg: "You're not allowed to register a vehicle for your company!" })
            }
        } else {
            processQuery("INSERT INTO `registered_cars` (`owner`, `vehicle`, `vin_number`, `in_status`, `plate`, `color`, `linked_to`, `company`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [owner, vehicle, vinNumber(17), status, plate, color, req.user.username, "none"])
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
    @Route /:carId
    @Auth Protected
*/
router.get("/:carId", auth, async (req, res) => {
    const vehicle = await processQuery("SELECT * FROM `registered_cars` WHERE `id` = ?", [req.params.carId]);

    if (!vehicle[0]) return res.json({ msg: "Vehicle Not Found" });


    if (vehicle[0].linked_to !== req.user.username) return res.json({ msg: "You can't edit someone elses vehicle!" });

    return res.json({ vehicle: vehicle });
});

/*
    @Route /:carId
    @Auth Protected
*/
router.put("/:carId", auth, async (req, res) => {
    const { color, status, company } = req.body;
    const carId = req.params.carId;

    if (color, status, company) {
        const vehicle = await processQuery("SELECT * FROM `registered_cars` WHERE `id` = ?", [carId]);

        if (!vehicle[0]) return res.json({ msg: "Vehicle Not Found!" });

        if (vehicle[0].linked_to !== req.user.username) return res.json({ msg: "You can't edit someone elses vehicle!" });

        processQuery("UPDATE `registered_cars` SET `color` = ?, `in_status` = ?, company = ? WHERE `registered_cars`.`id` = ?", [color, status, company, carId])
            .then(() => {
                return res.json({ msg: "Updated" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    };
});

/*
    @Route /:carId
    @Auth Protected
*/
router.delete("/:carId", auth, async (req, res) => {
    const carId = req.params.carId;
    const vehicle = await processQuery("SELECT * FROM `registered_cars` WHERE `id` = ?", [carId]);

    if (!vehicle[0]) return res.json({ msg: "Vehicle Not Found!" });


    if (vehicle[0].linked_to !== req.user.username) return res.json({ msg: "You can't edit someone elses vehicle!" });

    processQuery("DELETE FROM `registered_cars` WHERE `registered_cars`.`id` = ?", [carId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;