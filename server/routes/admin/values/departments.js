/*
    GET / - shows all departments
    POST /add - add a department
    GET /edit/:deptId - shows info about department
    PUT /edit/:deptId - update department
    DELETE /:deptId - delete department
*/

const router = require("express").Router();
const auth = require("../../../auth/tokenAuth");
const { processQuery } = require("../../../utils/db");
const createAuditLog = require("../../../utils/createAuditLog");
const { adminAuth } = require("../../../auth/authFunctions");


async function officerAdminAuth(req, res, next) {
    const user = await processQuery("SELECT rank, leo FROM `users` WHERE `id` = ?", [req.user.id]);

    // Check if the user has moderator+ Permissions
    if (user[0].rank === "moderator" || user[0].rank === "admin" || user[0].rank === "owner" || user[0].leo === "yes") {
        // User has access
        next();
    } else {
        // User doesn't have access
        return res.sendStatus(403)
    }
}

/*
    @Route /departments/
    @Auth Protected
*/
router.get("/", auth, officerAdminAuth, (req, res) => {
    processQuery("SELECT * FROM `departments`")
        .then((depts) => {
            return res.json({ departments: depts })
        })
        .catch(err => console.log(err));
});

/*
    @Route /departments/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { department } = req.body;

    if (department) {
        processQuery("INSERT INTO `departments` (`name`) VALUES (?)", [department])
            .then(() => {
                createAuditLog(`Department ${department} was added by ${req.user.username}`);
                return res.json({ msg: "Added" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields" })
    }

});

/*
    @Route /departments/edit/:deptId
    @Auth Protected
*/
router.get("/edit/:deptId", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `departments` WHERE id = ? ", [req.params.deptId])
        .then((dept) => {
            return res.json({ department: dept });
        })
        .catch(err => console.log(err));
});

/*
    @Route /departments/edit/:deptId
    @Auth Protected
*/
router.put("/edit/:deptId", auth, adminAuth, (req, res) => {
    const { department } = req.body;

    if (department) {
        processQuery("UPDATE `departments` SET `name` = ? WHERE `departments`.`id` = ?", [department, req.params.deptId])
            .then(() => {
                createAuditLog(`Department ${department} was edited by ${req.user.username}`);
                return res.json({ msg: "Updated" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Please fill in all fields" })
    }

});

/*
    @Route /departments/:deptId
    @Auth Protected
*/
router.delete("/:deptId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `departments` WHERE `departments`.`id` = ?", [req.params.deptId])
        .then(() => {
            createAuditLog(`A department was deleted by ${req.user.username}`);
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;