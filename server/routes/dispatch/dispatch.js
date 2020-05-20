/*
    GET / - shows all data needed for the dispatch page
    GET /address-search - shows all address found
    PUT /update-aop - updates AOP
    PUT /update-officer/:officerId - update officers status
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
// Dispatch Auth is too see if the user has the right permissions
const dispatchAuth = require("../../auth/dispatchAuth");


/*
    @Route /dispatch
    @Auth Protected
*/
router.get("/", auth, dispatchAuth, async (req, res) => {
    const addresses = await processQuery("SELECT address FROM `citizens`");
    // reminder casper: when going on-duty set status = "on-duty" > off-duty => "off-duty" LEO & EMS/FD
    const onDutyOfficers = await processQuery("SELECT * FROM `officers` WHERE `status` = ?", ["on-duty"]);
    const onDutyEMS_FD = await processQuery("SELECT * FROM `ems-fd` WHERE `status` = ?", ["on-duty"]);
    const bolos = await processQuery("SELECT * FROM `bolos`");

    return res.json({ addresses, onDutyOfficers, onDutyEMS_FD, bolos });
});


/*
    @Route /dispatch/address-search
    @Auth Protected
*/
router.get("/address-search", auth, dispatchAuth, (req, res) => {
    const { address } = req.body;
    processQuery("SELECT * FROM citizens WHERE address = ?", [address])
        .then((address) => {
            return res.json({ address })
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
router.put("/update-officer/:officerId", auth, dispatchAuth, (req, res) => {
    const { officerId } = req.params;
    const { status } = req.body;

    processQuery("UPDATE `officers` SET `status` = ? WHERE `officers`.`id` = ?", [status, officerId])
        .then(() => {
            return res.json({ msg: 'Updated' });
        })
        .catch(err => console.log(err));
});


module.exports = router;