/*
    GET / - shows all data needed for the dispatch page
    GET /address-search - shows all address found
    PUT /update-aop - updates AOP
    PUT /update-officer/:officerId - update officers status
    PUT /update-ems-fd/:deputyId - update EMS/FD status
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
// Dispatch Auth is too see if the user has the right permissions
const { dispatchAuth } = require("../../auth/authFunctions");


module.exports = function (io) {

    io.on("connection", socket => {
        socket.on("updateAop", (newAop) => {
            io.sockets.emit("updateAop", newAop);
        })

        socket.on("updateActiveUnits", () => {
            io.sockets.emit("updateActiveUnits");
        })
    })

    /*
        @Route /dispatch
        @Auth Protected
    */
    router.get("/", auth, dispatchAuth, async (req, res) => {
        const addresses = await processQuery("SELECT address FROM `citizens`").catch(err => console.log(err));
        // reminder casper: when going on-duty set status = "on-duty" > off-duty => "off-duty" LEO & EMS/FD
        const onDutyOfficers = await processQuery("SELECT * FROM `officers` WHERE `status` = ?", ["on-duty"]).catch(err => console.log(err));
        const onDutyEMS_FD = await processQuery("SELECT * FROM `ems-fd` WHERE `status` = ?", ["on-duty"]).catch(err => console.log(err));

        return res.json({ addresses, onDutyOfficers, onDutyEMS_FD });
    });


    /*
        @Route /dispatch/address-search
        @Auth Protected
    */
    router.post("/address-search", auth, dispatchAuth, (req, res) => {
        const address = req.body.address.trim();

        processQuery("SELECT * FROM citizens WHERE `citizens`.`address` LIKE ?", ["%" + address + "%"])
            .then((citizens) => {
                return res.json({ citizens })
            })
            .catch(err => console.log(err));
    });

    /*
        @Route /dispatch/update-aop
        @Auth Protected
    */
    router.put("/update-aop", auth, dispatchAuth, (req, res) => {
        const { newAop } = req.body;

        processQuery("UPDATE `cad_info` SET `AOP` = ?", [newAop])
            .then(() => {
                return res.json({ msg: "Updated" });
            })
            .catch(err => console.log(err));
    });

    /*
        @Route /dispatch/update-officer/:officerId
        @Auth Protected
    */
    router.put("/update-officer/:officerId", auth, async (req, res) => {
        const { officerId } = req.params;
        let { status, status2 } = req.body;

        if (status.toLowerCase() === "off-duty") {
            status2 = "--------"
        }

        const officer = await processQuery("SELECT * FROM `officers` WHERE `officers`.`id` = ?", [officerId]);

        await processQuery("UPDATE `officers` SET `status` = ?, `status2` = ? WHERE `officers`.`id` = ?", [status, status2, officerId])
            .then(() => {
                return res.json({ msg: 'Updated', officerName: officer[0].officer_name });
            })
            .catch(err => console.log(err));
    });

    /*
        @Route /dispatch/update-ems-fd/:deputyId
        @Auth Protected
    */

    router.put("/update-ems-fd/:deputyId", auth, dispatchAuth, (req, res) => {
        const { deputyId } = req.params;
        let { status, status2 } = req.body;

        if (status.toLowerCase() === "off-duty") {
            status2 = "--------"
        }

        processQuery("UPDATE `ems-fd` SET `status` = ?, `status2` = ? WHERE `ems-fd`.`id` = ?", [status, status2, deputyId])
            .then(() => {
                return res.json({ msg: 'Updated' });
            })
            .catch(err => console.log(err));
    });

    return router;

} 