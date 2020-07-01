/*
    GET / - get all citizens from user
    POST /add - add citizen
    PUT /:id - edit citizen
    DELETE /:id - delete citizen
    GET /all
*/
const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*
    @Route /
    @auth Protected
*/
router.get("/", auth, async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.json({ msg: "User wasn't found!" });
    }

    const citizens = await processQuery("SELECT * FROM `citizens` WHERE `linked_to` = ?", [user.username]);

    return res.json({ citizens });
});


/*
    @Route /:citizenId
    @auth Protected
    @extra: also used for GET edit
*/
router.get("/:citizenId", auth, async (req, res) => {
    const citizen = await processQuery("SELECT * FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);


    if (!citizen[0]) return res.json({ msg: "Citizen Not Found" })

    // Check if the citizen is linked to the account
    if (citizen[0].linked_to.toLowerCase() !== req.user.username.toLowerCase()) return res.json({ msg: "Forbidden" })


    // show the citizen information
    return res.json({ citizen: citizen });
});


/*
    @Route /add
    @auth Protected
*/
router.post("/add", auth, async (req, res) => {
    const file = req.files ? req.files.image : null;
    const fileName = req.files ? file.name : "default.svg";


    const { fullName, birth, gender, ethnicity, hairColor, eyeColor, address, height, weight, dmv, fireLicense, pilotLicense, ccw } = req.body;
    if (fullName, birth, gender, ethnicity, hairColor, eyeColor, address, height, weight) {

        // check if name already is in use
        const citizen = await processQuery("SELECT * FROM `citizens` WHERE `full_name` = ?", [fullName]);

        if (citizen[0]) return res.json({ msg: "Name is Already in use!" });

        // Move the picture to /public/citizens-picture
        file ? file.mv("./public/citizen-pictures/" + fileName, err => {
            if (err) {
                return console.log(err);
            }
        }) : null;

        // Create the citizen        
        const query = "INSERT INTO `citizens` ( `full_name`, `stringifyd_name`, `linked_to`, `birth`, `gender`, `ethnicity`, `hair_color`, `eye_color`, `address`, `height`, `weight`, `dmv`, `fire_license`, `pilot_license`,`ccw`,`business`, `rank`, `vehicle_reg`, `posts`, `citizen_picture`, `b_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        processQuery(query, [fullName, "", req.user.username, birth, gender, ethnicity, hairColor, eyeColor, address, height, weight, dmv, fireLicense, pilotLicense, ccw, "Not Working Anywhere", "", "true", "true", fileName, ""])
            .then(citizen => {
                return res.json({ msg: "Citizen Created" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    };
});


/*
    @Route PUT /:citizenId
    @auth Protected
*/
router.put("/:citizenId", auth, async (req, res) => {
    let query = "";
    let data = "";
    const file = req.files ? req.files.image : null;
    let fileName = req.files ? file.name : "";

    // Check if the citizen is linked to the account 
    const citizen = await processQuery("SELECT * FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);
    if (citizen[0].linked_to.toLowerCase() !== req.user.username.toLowerCase()) return res.sendStatus(403);


    const { birth, gender, ethnicity, hairColor, eyeColor, address, height, weight, dmv } = req.body

    if (file) {
        query = "UPDATE `citizens` SET `birth` = ?, `gender` = ?, `ethnicity` = ?, `hair_color` = ?, `eye_color` = ?, `address` = ?, `height` = ?, `weight` = ?, `citizen_picture` = ? WHERE `citizens`.`id` = ?";
        data = [birth, gender, ethnicity, hairColor, eyeColor, address, height, weight, fileName, req.params.citizenId]
    } else {
        query = "UPDATE `citizens` SET `birth` = ?, `gender` = ?, `ethnicity` = ?, `hair_color` = ?, `eye_color` = ?, `address` = ?, `height` = ?, `weight` = ? WHERE `citizens`.`id` = ?";
        data = [birth, gender, ethnicity, hairColor, eyeColor, address, height, weight, req.params.citizenId]
    }

    processQuery(query, data)
        .then(() => {
            if (file) {
                file.mv("./public/citizen-pictures/" + fileName, err => {
                    if (err) {
                        return console.log(err);
                    }
                })
            }
            return res.json({ msg: "Citizen Updated" })
        })
        .catch(err => console.log(err));
});


/*
    @Route DELETE /:citizenId
    @auth Protected
*/
router.delete("/:citizenId", auth, async (req, res) => {
    // Check if the citizen is linked to the account 
    const citizen = await processQuery("SELECT * FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);
    if (citizen[0].linked_to.toLowerCase() !== req.user.username.toLowerCase()) return res.sendStatus(403);

    //  Delete the citizen
    processQuery("DELETE FROM `citizens` WHERE `id` = ?", [req.params.citizenId])
        .then(() => {
            return res.json({ msg: "Deleted" })
        })
        .catch(err => console.log(err));
});

/*
    @Route /all
    @auth Protected
*/
router.post("/all", auth, async (req, res) => {
    // Check if the citizen is linked to the account 
    const citizens = await processQuery("SELECT id, full_name FROM `citizens`");

    return res.json({ citizens: citizens })
});

module.exports = router;