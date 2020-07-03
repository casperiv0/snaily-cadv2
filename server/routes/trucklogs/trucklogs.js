/*
    GET /truck-logs - Shows all truck logs linked to an account
    POST /truck-logs/create - create a truck log
    DELETE /truck-logs/:logId - delete a truck log
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*
    @Route /truck-logs
    @Auth Protected
*/
router.get("/", auth, (req, res) => {
    processQuery("SELECT * FROM `truck_logs` WHERE `linked_to` = ?", [req.user.username])
        .then((logs) => {
            return res.json({ logs: logs, })
        }).catch(err => console.log(logs));
});


/*
    @Route /truck-logs/create
    @Auth Protected
*/
router.post("/create", auth, (req, res) => {
    let { name, date, co_driver, start_time, plate } = req.body;

    if (name && date && start_time && plate) {

        if (co_driver === "") {
            co_driver = "None";
        }

        processQuery("INSERT INTO `truck_logs` (`name`, `timestamp`, `co_driver`, `start_time`, `plate`, `linked_to`) VALUES (?, ?, ?, ?, ?, ?)",
            [name, date, co_driver, start_time, plate, req.user.username])
            .then(() => {
                return res.json({ msg: "Created" });
            }).catch(err => console.log(err));

    } else {
        return res.json({ msg: "Please fill in all required fields!" });
    };
});


router.delete("/:logId", auth, (req, res) => {
    const { logId } = req.params;

    processQuery("DELETE FROM `truck_logs` WHERE `id` = ?", [logId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        }).catch(err => console.log(err));
});

module.exports = router;