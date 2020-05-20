/*
    GET /911calls - shows all 911 calls
    POST /create-911-call - create 911 call
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*
    @Route /global/911calls
    @Auth Protected
*/
router.get("/911calls", auth, async (req, res) => {
    const user = await processQuery("SELECT rank, leo, ems_fd, dispatch FROM `users` WHERE `id` = ?", [req.user.id]);

    if (user[0].leo === "yes" || user[0].ems_fd === "yes" || user[0].dispatch === "yes") {

        processQuery("SELECT * FROM `911calls`")
            .then(calls => {
                return res.json({ calls: calls });
            })
            .catch(err => console.log(err));

    } else {
        return res.sendStatus(403);
    };
});


/*
    @Route /global/create-911-call
    @Auth Public
*/
router.post("/create-911-call", (req, res) => {
    const { description, caller, location } = req.body;

    if (description, caller, location) {
        processQuery("INSERT INTO `911calls` (`description`, `name`, `location`, `status`, `assigned_unit`) VALUES (?, ?, ?, ?, ?)",
            [description, caller, location, "Not Assigned", ""])
            .then(() => {
                return res.json({ msg: "911 was called" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    };
})


module.exports = router;