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
const adminAuth = require("../../../auth/adminAuth");

/*
    @Route /departments/
    @Auth Protected
*/
router.get("/", auth, adminAuth, (req, res) => {
    processQuery("SELECT * FROM `departments`")
        .then((depts) => {
            return res.json({ departments: depts})
        })
        .catch(err => console.log(err));
});

/*
    @Route /departments/add
    @Auth Protected
*/
router.post("/add", auth, adminAuth, (req, res) => {
    const { department } = req.body;
    processQuery("INSERT INTO `departments` (`name`) VALUES (?)", [department])
        .then(() => {
            return res.json({ msg: "Added" });
        })
        .catch(err => console.log(err));
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

    processQuery("UPDATE `departments` SET `name` = ? WHERE `departments`.`id` = ?", [department, req.params.deptId])
        .then(() => {
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});

/*
    @Route /departments/:deptId
    @Auth Protected
*/
router.delete("/:deptId", auth, adminAuth, (req, res) => {
    processQuery("DELETE FROM `departments` WHERE `departments`.`id` = ?", [req.params.deptId])
        .then(() => {
            return res.json({ msg: "Deleted" });
        })
        .catch(err => console.log(err));
});



module.exports = router;