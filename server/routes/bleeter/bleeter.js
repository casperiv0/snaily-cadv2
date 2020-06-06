/*
    GET / - shows all bleets
    POST /create - create a new bleet
    GET /:bleetId - shows information about bleet 
    GET /edit/:bleetId - shows information about bleet 
    PUT /edit/:bleetId - edit bleet
    POST /:bleetId/like - add a like to a bleet
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
    processQuery("SELECT * FROM `bleets` ORDER BY `id` DESC")
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
    const file = req.files ? req.files.image : null;
    const fileName = req.files ? file.name : ""
    const uploadedAt = new Date().toLocaleDateString();
    const uploadedBy = req.user.username;

    if (title && bleet) {

        processQuery("INSERT INTO `bleets` (`title`, `description`, `uploaded_by`, `uploaded_at`, `file_dir`, `pinned`, `likes`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, bleet, uploadedBy, uploadedAt, fileName, "false", 0])
            .then((result) => {
                if (file) {
                    file.mv("./public/bleeter-pictures/" + fileName, (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    })
                }
                return res.json({ msg: "Created", bleetId: result.insertId });
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
    const file = req.files ? req.files.image : null;
    const fileName = req.files ? file.name : ""

    let query = "";
    let data = [];

    if (file) {
        query = "UPDATE `bleets` SET `title` = ?, `description` = ?, `file_dir` = ? WHERE `bleets`.`id` = ?";
        data = [title, description, fileName, req.params.bleetId]
    } else {
        query = "UPDATE `bleets` SET `title` = ?, `description` = ? WHERE `bleets`.`id` = ?";
        data = [title, description, req.params.bleetId];
    }

    processQuery(query, data)
        .then(() => {
            if (file) {
                file.mv("./public/bleeter-pictures/" + fileName, (err) => {
                    if (err) {
                        return console.log(err);
                    };
                });
            };
            return res.json({ msg: "Updated" });
        })
        .catch(err => console.log(err));
});


router.post('/:bleetId/like', auth, async (req, res) => {
    const { bleetId } = req.params;
    const bleet = await processQuery("SELECT * FROM `bleets` WHERE `id` = ?", [bleetId]);

    if (bleet[0].uploaded_by === req.user.username) return res.json({ msg: "You can't like your own bleet!" });

    processQuery("UPDATE `bleets` SET `likes` = ? WHERE `id` = ?", [bleet[0].likes + 1, bleetId]).then(() => {
        return res.json({ msg: "Liked" })
    }).catch(err => console.log(err));
})


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