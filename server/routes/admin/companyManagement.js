/*
    DELETE /:companyId - delete Company
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const { adminAuth } = require("../../auth/authFunctions");
const createAuditLog = require("../../utils/createAuditLog");



/*
    @Route /admin/companies/:companyId
    @Auth Protected
*/
router.delete("/:companyId", auth, adminAuth, (req, res) => {
    const { companyId } = req.params;

    processQuery("DELETE FROM `businesses` WHERE `id` = ?", [companyId])
        .then(() => {
            createAuditLog(`A company was deleted by ${req.user.username}`)
            return res.json({ msg: "Company Deleted" });
        })
        .catch(err => console.log(err));
});


module.exports = router;