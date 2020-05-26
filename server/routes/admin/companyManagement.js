/*
    DELETE /:companyId - delete Company
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const adminAuth = require("../../auth/adminAuth");


/*
    @Route /admin/companies/:companyId
    @Auth Protected
*/
router.delete("/:companyId", auth, adminAuth, (req, res) => {
    const { companyId } = req.params;

    processQuery("DELETE FROM `businesses` WHERE `id` = ?", [companyId])
        .then(() => {
            return res.json({ msg: "Company Deleted" });
        })
        .catch(err => console.log(err));
});


module.exports = router;