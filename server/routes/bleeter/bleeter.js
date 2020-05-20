/*
    GET / - shows all bleets
    POST /create - create a new bleet
    GET /:bleetId - shows information about bleet 
    GET /edit/:bleetId - shows information about bleet 
    PUT /edit/:bleetId - edit bleet
    DELETE /:bleetId - delete bleet, moderator+ only
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");


/*
    @Route /bleeter/
    @Auth Protected
*/
router.get("/", auth, async (req, res) => {
    processQuery("SELECT * FROM `bleets`")
        .then(bleets => {
            return res.json({ bleets: bleets });
        })
        .catch(err => console.log(err));
});


/*
    @Route /bleeter/create
    @Auth Protected
*/
router.post("/create", auth, async (req, res) => {
    const { title, bleet } = req.body;
    const uploadedAt = new Date().toLocaleDateString();
    const uploadedBy = req.user.username;

    if (title, bleet) {

        processQuery("INSERT INTO `bleets` (`title`, `description`, `uploaded_by`, `uploaded_at`, `file_dir`) VALUES (?, ?, ?, ?, ?)",
            [title, bleet, uploadedBy, uploadedAt, ""])
            .then(() => {
                return res.json({ msg: "Uploaded" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "please fill in all fields!" });
    };
});

/*
    @Route /bleeter/:bleetId
    @Auth Protected
*/
router.get("/:bleetId", auth, async (req, res) => {
    processQuery("SELECT * FROM `bleets` WHERE `bleets`.`id` = ?", [req.params.bleetId])
        .then(bleet => {
            return res.json({ bleet: bleet });
        })
        .catch(er => console.log(er));
});


/*
    @Route /bleeter/edit/:bleetId
    @Auth Protected
*/
router.get("/edit/:bleetId", auth, async (req, res) => {
    const bleet = await processQuery("SELECT * FROM `bleets` WHERE `bleets`.`id` = ?", [req.params.bleetId]);

    // Check if the bleet exists
    if (!bleet[0]) return res.json({ msg: "Bleet not found!" });

    // Check if the bleet is uploaded by the user
    if (bleet[0].uploaded_by !== req.user.username) return res.sendStatus(403);

    // Return the bleet
    return res.json({ bleet: bleet });
});


/*
    @Route /bleeter/edit/:bleetId
    @Auth Protected
*/
router.put("/edit/:bleetId", auth, async (req, res) => {
    const bleet = await processQuery("SELECT * FROM `bleets` WHERE `bleets`.`id` = ?", [req.params.bleetId]);

    // Check if the bleet exists
    if (!bleet[0]) return res.json({ msg: "Bleet not found!" });

    // Check if the bleet is uploaded by the user
    if (bleet[0].uploaded_by !== req.user.username) return res.sendStatus(403);

    const { title, description } = req.body;

    processQuery("UPDATE `bleets` SET `title` = ?, `description` = ? WHERE `bleets`.`id` = ?", [title, description, req.params.bleetId])
        .then(() => {
            return res.json({ msg: "Bleet Updated" });
        })
        .catch(err => console.log(err));
});


/*
    @Route /bleeter/:bleetId
    @Auth Protected
*/
router.delete("/:bleetId", auth, (req, res) => {
    const bleetId = req.params.bleetId;

    if (req.user.rank === "moderator" || req.user.rank === "admin" || req.user.rank === "owner") {
        processQuery("DELETE FROM `bleets` WHERE `bleets`.`id` = ?", [bleetId])
            .then(() => {
                return res.json({ msg: "Deleted Bleet" });
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Only Moderators+ Are able to delete bleets for now!" })
    }


})


module.exports = router;