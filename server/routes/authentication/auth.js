const router = require('express').Router();
const { processQuery } = require('../../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../auth/tokenAuth');
const { jwt_secret } = require("../../../config.js");

/*
    @route /register
    @auth Public
*/
router.post('/register', async (req, res) => {
	const { username, password, password2 } = req.body;

	if (username && password && password2) {

        // Check if password are the same
        if (password !== password2) {
            return res.json({ msg: "Password do not match" });
        };

        // Check if user already exists
        const result = await processQuery("SELECT * FROM `users` WHERE `username` = ?", [username]);

        // Encrypt password
        bcrypt.hash(password, 15, async (err, encryptedPassword) => {
            if (err) {
                console.log(err);
                return res.json({ msg: "There was an error encrypting your password!" })
            }


            if (result.length > 0) {
                // User Already exists
                return res.json({ msg: "Username already exists! Please use a different username!" });
            };

            // Check if theres no registered users
            const users = await processQuery("SELECT * FROM `users`");

            if (users.length > 0) {
                // Check if the CAD is whitelisted
                const cad_info = await processQuery("SELECT * FROM `cad_info`");


                // CAD is whitelisted and Tow too
                if (cad_info[0].whitelisted === "true" && cad_info[0].tow_whitelisted === "true") {
                    return processQuery("INSERT INTO `users` (`username`, `password`, `rank`, `leo`, `ems_fd`, `dispatch`, `tow`, `banned`, `ban_reason`, `whitelist_status`, `dispatch_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [username, encryptedPassword, "No Rank", "no", "no", "no", "no", "false", "", "pending", ""])
                        .then(() => { return res.json({ msg: "Pending" }) }).catch(err => {
                            console.log(err);

                            return res.json({ msg: "something went wrong!" })
                        })
                }

                // CAD is whitelisted but tow is not
                if (cad_info[0].whitelisted === "true" && cad_info[0].tow_whitelisted === "false") {
                    return processQuery("INSERT INTO `users` (`username`, `password`, `rank`, `leo`, `ems_fd`, `dispatch`, `tow`, `banned`, `ban_reason`, `whitelist_status`, `dispatch_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [username, encryptedPassword, "No Rank", "no", "no", "no", "yes", "false", "", "pending", ""]).then(() => { return res.json({ msg: "Pending" }) })
                };


                // CAD is not whitelisted but Tow is 
                if (cad_info[0].whitelisted === "false" && cad_info[0].tow_whitelisted === "true") {
                    const newUser = await processQuery("INSERT INTO `users` (`username`, `password`, `rank`, `leo`, `ems_fd`, `dispatch`, `tow`, `banned`, `ban_reason`, `whitelist_status`, `dispatch_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [username, encryptedPassword, "No Rank", "no", "no", "no", "no", "false", "", "accepted", ""])
                    const token = jwt.sign({
                        id: newUser.insertId,
                        username: username,
                        rank: "No Rank",
                    }, jwt_secret, { expiresIn: 3600 });

                    return res.json({ msg: "User Created", token: token });
                }


                // none are whitelisted
                if (cad_info[0].whitelisted === "false" && cad_info[0].tow_whitelisted === "false") {
                    const newUser = await processQuery("INSERT INTO `users` (`username`, `password`, `rank`, `leo`, `ems_fd`, `dispatch`, `tow`, `banned`, `ban_reason`, `whitelist_status`, `dispatch_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [username, encryptedPassword, "No Rank", "no", "no", "no", "yes", "false", "", "accepted", ""])

                    const token = jwt.sign({
                        id: newUser.insertId,
                        username: username,
                        rank: "No Rank",
                    }, jwt_secret, { expiresIn: 3600 });

                    return res.json({ msg: "User Created", token: token });
                };



            } else {
                // Create CAD
                processQuery("INSERT INTO `cad_info` (`owner`, `cad_name`, `AOP`, `tow_whitelisted`, `whitelisted`, `company_whitelisted`) VALUES (?, ?, ?, ?, ?, ?)",
                    [username, 'Change Me', 'Change Me', 'false', 'false', 'false']).catch(err => console.log(err));

                // Create user
                const newUser = await processQuery("INSERT INTO `users` (`username`, `password`, `rank`, `leo`, `ems_fd`, `dispatch`, `tow`, `banned`, `ban_reason`, `whitelist_status`, `dispatch_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [username, encryptedPassword, "owner", "yes", "yes", "yes", "yes", "false", "", "accepted", ""])
                const token = jwt.sign({
                    id: newUser.insertId,
                    username: username,
                    rank: "owner",
                }, jwt_secret, { expiresIn: 3600 });

                return res.json({ msg: "Owner Created", token: token });
            }


        });
    } else {
        res.json({ msg: "Please fill in all fields!" });
    };
});


/*
    @Route /login
    @auth Public
*/
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Check if all fields are filled in
    if (username && password) {

        const user = await processQuery("SELECT * FROM `users` WHERE `username` = ?", [username]).catch(err => {
            console.log(err);
            return res.json({ msg: "Whoops! Something didn't go as planned" })
        })

        // Check if user exist
        if (!user[0]) {
            return res.json({ msg: "User wasn't found in out systems" });
        };

        // Check if password is correct
        bcrypt.compare(password, user[0].password, async (err, result) => {
            if (err) return res.json({ msg: "There was an err getting back your password" });

            if (user[0].banned === "true") return res.json({ msg: `This Account Was Banned From This CAD, reason: ${user[0].ban_reason}` });

            if (user[0].whitelist_status === "pending") return res.json({ msg: "This Account is still pending access" });

            // password is incorrect
            if (result === false) return res.json({ msg: "Password was incorrect" });

            // Setup token... with id rank and all
            if (result) {
                const token = jwt.sign({
                    id: user[0].id,
                    username: username,
                    rank: user[0].rank,
                }, jwt_secret, { expiresIn: 3600 });


                return res.json({ msg: "LoggedIn", token: token });
            };
        });
    } else {
        return res.json({ msg: "Please fill in all fields!" });
    };
});


/*
    @Route /user
    @auth Protected
*/
router.get("/user", auth, async (req, res) => {
    const user = await processQuery("SELECT id, username, rank, leo, ems_fd, dispatch, tow  FROM `users` WHERE `id` = ?", [req.user.id]);

    if (!user[0]) return res.json({ msg: "User not found" })

    return res.json({ user: user });
});


/*
    @Route /cad_info
    @Auth Protected
*/
router.get("/cad-info", auth, (req, res) => {
    processQuery("SELECT tow_whitelisted, AOP, cad_name, whitelisted, company_whitelisted FROM `cad_info`")
        .then((data) => {
            return res.json({ cadInfo: data });
        })
        .catch(err => console.log(err));
})


/*
    @Route /auth/remove-account
    @Auth Protected
*/
router.delete("/remove-account", auth, async (req, res) => {
    const citizens = await processQuery("SELECT * FROM `citizens` WHERE `linked_to` = ?", [req.user.username]).catch(err => console.log(err));
    const username = req.user.username;

    citizens.forEach((citizen) => {
        const citizenName = citizen.full_name
        processQuery("DELETE FROM `arrest_reports` WHERE `arrestee_name` = ?", [citizenName]).catch(err => console.log(err));
        processQuery("DELETE FROM `posts` WHERE `uploadedBy` = ?", [citizenName]).catch(err => console.log(err));
        processQuery("DELETE FROM `warrants` WHERE `name` = ?", [citizenName]).catch(err => console.log(err));
        processQuery("DELETE FROM `written_warnings` WHERE `name` = ?", [citizenName]).catch(err => console.log(err));
        processQuery("DELETE FROM `leo_tickets` WHERE `name` = ?", [citizenName]).catch(err => console.log(err));
        processQuery("DELETE FROM `medical_records` WHERE `name` = ?", [citizenName]).catch(err => console.log(err));
    });

    processQuery("DELETE FROM `citizens` WHERE `linked_to` = ?", [username]).catch(err => console.log(err));
    processQuery("DELETE FROM `businesses` WHERE `linked_to` = ?", [username]).catch(err => console.log(err));
    processQuery("DELETE FROM `ems-fd` WHERE `linked_to` = ?", [username]).catch(err => console.log(err));
    processQuery("DELETE FROM `officers` WHERE `linked_to` = ?", [username]).catch(err => console.log(err));
    processQuery("DELETE FROM `registered_cars` WHERE `linked_to` = ?", [username]).catch(err => console.log(err));
    processQuery("DELETE FROM `registered_weapons` WHERE `linked_to` = ?", [username]).catch(err => console.log(err));

    processQuery("DELETE FROM `users` WHERE `id` = ?", [req.user.id]).then(() => {
        return res.json({ msg: 'Deleted' });
    }).catch(err => console.log(err));
})

module.exports = router;