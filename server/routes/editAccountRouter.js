/*
    PUT /edit - edit account
    GET /account-summary
*/

const router = require("express").Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const auth = require("../auth/tokenAuth");
const { processQuery } = require("../utils/db");

/*
    @Route /account/edit
    @Auth Protected
*/
router.put("/edit", auth, async (req, res) => {
    const { oldPassword, newPassword, newPassword2 } = req.body;

    if (oldPassword && newPassword && newPassword2) {

        if (newPassword !== newPassword2) return res.json({ msg: "New Passwords do not match!" });

        const user = await processQuery("SELECT * FROM `users` WHERE `id` = ?", [req.user.id]);

        if (!user[0]) return res.json({ msg: "User Not Found" });

        bcrypt.compare(oldPassword, user[0].password, (err, result) => {
            if (err) {
                return console.log(err);
            }

            if (result === false) return res.json({ msg: "Incorrect Password!" });

            bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err) return console.log(err);
                processQuery("UPDATE `users` SET `password` = ? WHERE `users`.`id` = ?", [hash, user[0].id])
                    .then(() => {
                        return res.json({ msg: "Updated" })
                    })
                    .catch(err => console.log(err));
            })
        });
    } else {
        return res.json({ msg: "Please fill in all fields" })
    }
});


/*
    @Route /account-summary
    @Auth Protected
*/
// router.get("/account-summary", auth, async (req, res) => {
//     const totalRegisteredVehicles = await processQuery("SELECT id FROM `registered_cars` WHERE `linked_to` = ?", [req.user.username]).catch(err => console.log(err));
//     const totalRegisteredWeapons = await processQuery("SELECT id FROM `registered_weapons` WHERE `linked_to` = ?", [req.user.username]).catch(err => console.log(err));
// });

module.exports = router;