/*
    GET /911calls - shows all 911 calls
    GET /tow-calls - shows all tow calls
    
    DELETE /911calls/:callId - cancel/delete 911 call 
    PUT /911calls/:callId - update 911 call
    DELETE /tow-calls/:callId - Cancel/delete tow call

    POST /create-911-call - create 911 call
    POST /create-tow-call

    GET /bolos - get all bolos
    POST /add-bolo - add a bolo
    DELETE /bolos/:boloId - delete a bolo

    POST /suspend-dmv/:citizenId - suspend a drivers license

    POST /add-warrant - add a new warrant
    PUT /update-warrant/:warrantId - change warrant status from active => inactive or inactive => active
*/


const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");

// This is to check if the user has the right permissions (dispatch or police)
const { emrAuth } = require("../../auth/authFunctions");



module.exports = function (io) {


    io.on("connection", socket => {
        // console.log(socket);
        socket.on("panicStart", (data) => {
            if (data.start) {
                socket.broadcast.emit("panicStart", data);
            }
        })

        // will emit on remove or create 911 call
        socket.on("update911Calls", () => {
            io.sockets.emit("update911Calls")
        })

        // will emit on remove or add of a bolo
        socket.on("updateBolos", () => {
            io.sockets.emit("updateBolos")
        });

        // tow calls
        socket.on("updateTowCalls", () => {
            io.sockets.emit("updateTowCalls");
        });

        socket.on("new911Call", () => {
            io.sockets.emit("new911Call");
        })
    });

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
        let { description, caller, location } = req.body;

        if (!description) {
            description = "Not specified"
        }

        if (caller && location) {

            processQuery("INSERT INTO `911calls` (`description`, `name`, `location`, `status`, `assigned_unit`) VALUES (?, ?, ?, ?, ?)",
                [description, caller, location, "Not Assigned", "none"])
                .then(() => {
                    io.sockets.emit("update911Calls");
                    return res.json({ msg: "911 was called" });
                })
                .catch(err => console.log(err));
        } else {
            return res.json({ msg: "Please fill in all fields!" });
        };
    });


    /*
        @Route /global/911calls/:callId
        @Auth Protected
    */
    router.delete("/911calls/:callId", auth, emrAuth, (req, res) => {

        processQuery("DELETE FROM `911calls` WHERE `911calls`.`id` = ?", [req.params.callId])
            .then(() => {
                res.json({ msg: "Canceled" });
            })
            .catch(err => console.log(err));
    });

    /*
        @Route /global/911calls/:callId
        @Auth Protected
    */
    router.put("/911calls/:callId", auth, emrAuth, (req, res) => {
        const { location, description } = req.body;
        let assigned_unit = [req.body.assigned_unit].join(", ");
        let status = "";

        if (assigned_unit) {
            status = "Assigned"
        } else {
            assigned_unit = "none"
            status = "Not Assigned"
        }

        processQuery("UPDATE `911calls` SET `location` = ?, `status` = ?, `assigned_unit` = ?, `description` = ? WHERE `911calls`.`id` = ?",
            [location, status, assigned_unit, description, req.params.callId])
            .then(() => {
                return res.json({ msg: "Updated" });
            })
            .catch(err => console.log(err));
    });


    /*
        @Route /global/tow-calls
        @Auth Public
    */
    router.get("/tow-calls", (req, res) => {
        processQuery("SELECT * FROM `tow_calls`")
            .then(calls => {
                return res.json({ towCalls: calls });
            })
            .catch(err => console.log(err));
    });


    /*
        @Route /global/create-tow-call
        @Auth Public
    */
    router.post("/create-tow-call", (req, res) => {
        let { description, caller, location } = req.body;

        if (!description) {
            description = "Not specified"
        }

        if (caller && location) {
            processQuery("INSERT INTO `tow_calls` (`description`, `name`, `location`) VALUES (?, ?, ?)", [description, caller, location])
                .then(() => {
                    io.sockets.emit("updateTowCalls");
                    return res.json({ msg: "Tow Truckers Called" });
                })
                .catch(err => console.log(err));
        } else {
            res.json({ msg: "Please fill in all fields" });
        };
    });


    /*
        @Route /global/tow-calls/:callId
        @Auth Public
    */
    router.delete("/tow-calls/:callId", (req, res) => {
        processQuery("DELETE FROM `tow_calls` WHERE `id` = ?", [req.params.callId])
            .then(() => {
                return res.json({ msg: "Canceled" });
            })
            .catch(err => console.log(err));
    })

    /*
        @Route /global/bolos
        @Auth Protected
    */
    router.get("/bolos", auth, emrAuth, (req, res) => {
        processQuery("SELECT *  FROM `bolos`")
            .then((bolos) => {
                return res.json({ bolos: bolos });
            })
            .catch(err => console.log(err));
    });

    /*
        @Route /global/add-bolo
        @Auth Protected
    */
    router.post("/add-bolo", auth, emrAuth, (req, res) => {
        let { type, plate, color, name, description } = req.body;

        plate !== "" ? plate : plate = "No plate specified";
        color !== "" ? color : color = "No color specified";
        name !== "" ? name : name = "No name specified";

        if (type && description) {
            processQuery("INSERT INTO `bolos` (`type`, `description`, `plate`, `name`, `color`) VALUES (?, ?, ?, ?, ?)", [type, description, plate, name, color])
                .then(() => {
                    return res.json({ msg: "Added" });
                })
                .catch(err => console.log(err));
        } else {
            return res.json({ msg: "Type and description are required" });
        }
    });

    /*
        @Route /global/bolos/:boloId
        @Auth Protected
    */
    router.delete("/bolos/:boloId", auth, emrAuth, async (req, res) => {
        processQuery("DELETE FROM `bolos` WHERE `id` = ?", [req.params.boloId])
            .then(() => {
                return res.json({ msg: "Deleted Bolo" });
            })
            .catch(err => console.log(err));
    });

    /*
        @Route /global/suspend-dmv/:citizenId
        @Auth Protected
    */
    router.post("/suspend-dmv/:citizenId", auth, emrAuth, (req, res) => {
        processQuery("UPDATE `citizens` SET `dmv` = ? WHERE `citizens`.`id` = ?", ["Suspended", req.params.citizenId])
            .then(() => {
                return res.json({ msg: "Suspended License" });
            })
            .catch(err => console.log(err));
    });


    /*
        @Route /global/add-warrant
        @Auth Protected
    */
    router.post("/add-warrant", auth, emrAuth, (req, res) => {
        const { reason, status, name } = req.body;

        if (reason && status && name) {
            processQuery("INSERT INTO `warrants` ( `name`, `reason`, `status`) VALUES (?, ?, ?)", [name, reason, status])
                .then(() => {
                    return res.json({ msg: "Added Warrant" });
                })
                .catch(err => console.log(err));
        } else {
            res.json({ msg: "Please fill in all fields" });
        };
    });


    /*
        @Route /global/update-warrant/:warrantId
        @Auth Protected
    */
    router.put("/update-warrant/:warrantId", auth, emrAuth, async (req, res) => {
        const warrant = await processQuery("SELECT * FROM `warrants` WHERE `id` = ?", [req.params.warrantId]);

        if (!warrant[0]) return res.json({ msg: "Warrant wasn't found!" });

        if (warrant[0].status === "Active") {
            status = "Inactive";
        } else {
            status = "Active";
        };

        processQuery("UPDATE `warrants` SET `status` = ? WHERE `id` = ?", [status, req.params.warrantId])
            .then(() => {
                return res.json({ msg: "Updated" });
            })
            .catch(err => console.log(err));

    });

    return router;
}    
