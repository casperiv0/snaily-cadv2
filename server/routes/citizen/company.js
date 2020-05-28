/*
    GET / - shows all companies in the CAD
    POST /join - join a company
    POST /create - create a company
    GET /:citizenId-:company
    Still need todo update employees and such
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");

/*
    @Route /
    @auth Protected
    @Extra: Used for joining company & admin companies list
*/
router.get("/", auth, async (req, res) => {
    const companies = await processQuery("SELECT * FROM `businesses`");
    const citizens = await processQuery("SELECT * FROM `citizens` WHERE `linked_to` = ?", [req.user.username]);

    res.json({ companies: companies, citizens: citizens });
});


/*
    @Route /join
    @auth Protected
*/
router.post("/join", auth, async (req, res) => {
    const { joinedCompany, citizenName } = req.body;

    // Check if company is whitelisted
    const company = await processQuery("SELECT * FROM `businesses` WHERE `business_name` = ?", [joinedCompany]);

    if (!company[0]) return res.json({ msg: "Company wasn't found!" })

    if (company[0].whitelisted === "true") {
        processQuery("UPDATE `citizens` SET `business` = ?, `b_status` = ? WHERE `full_name` = ?", [joinedCompany, "awaiting", citizenName])
            .then(() => {
                return res.json({ msg: "pending" });
            })
            .catch(err => console.log(err));
    } else {
        processQuery("UPDATE `citizens` SET `business` = ?, `b_status` = ? WHERE `full_name` = ?", [joinedCompany, "accepted", citizenName])
            .then(() => {
                return res.json({ msg: "Joined" });
            })
            .catch(err => console.log(err));
    };
});


/*
    @Route /create
    @auth Protected
*/
router.post("/create", auth, async (req, res) => {
    const { companyName, owner, whitelistStatus } = req.body;


    if (companyName && owner) {
        // Check if company already exists
        const company = await processQuery("SELECT * FROM `businesses` WHERE `business_name` = ?", [companyName]);

        if (company[0]) return res.json({ msg: "Company name is already in use!" });


        // Create the company
        processQuery("INSERT INTO `businesses` (`business_name`, `business_owner`, `linked_to`, `whitelisted`) VALUES (?, ?, ?, ?)", [companyName, owner, req.user.username, whitelistStatus]);
        processQuery("UPDATE `citizens` SET `business` = ?, `rank` = ? WHERE `citizens`.`full_name` = ?", [companyName, "owner", owner]);


        return res.json({ msg: "Company Created" });
    } else {
        return res.json({ msg: "Company Name and owner are required!" })
    }

});



/*
    @Route /:citizenId-:company
    @auth Protected
*/
router.get("/:citizenId-:company", auth, async (req, res) => {
    // Get all the data from the database
    const company = await processQuery("SELECT * FROM `businesses` WHERE `business_name` = ?", [req.params.company]);
    const citizen = await processQuery("SELECT linked_to, full_name, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);
    const posts = await processQuery("SELECT * FROM `posts` WHERE `linked_to_bus` = ?", [req.params.company]);

    // Check if company & citizen exist
    if (!company[0]) return res.json({ msg: "Company wasn't found!" });
    if (!citizen[0]) return res.json({ msg: "Citizen wasn't found!" });

    // Check if this citizen works here
    if (citizen[0].business === req.params.company) return res.json({ msg: "You're not working here" })

    // Check if citizen is from the account
    if (citizen[0].linked_to !== req.user.username) return res.json({ msg: "This citizen is not yours!" });


    // send data from the company & citizen
    return res.json({ company: company, citizen: citizen, posts: posts });
});




/*
    @Route /:citizenId-:company/create-post
    @Auth Protected
*/
router.post("/:citizenId-:company/create-post", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);


    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })

    // Check if citizen is from the account
    if (citizen[0].linked_to !== req.user.username) return res.json({ msg: "This citizen is not yours!" });


    // check if citizen can post
    if (citizen[0].rank === "owner" || citizen[0].posts === "true" || citizen[0].rank === "manager") {
        const { title, description } = req.body;
        const uploadedAt = new Date().toLocaleDateString();
        const uploadedBy = req.user.username;

        processQuery("INSERT INTO `posts` (`linked_to_bus`, `title`, `description`, `uploadedBy`, `uploadedAt`) VALUES (?, ?, ?, ?, ?)", [req.params.company, title, description, uploadedBy, uploadedAt])
            .then(post => {
                return res.json({ msg: "Post Created" })
            })
            .catch(err => console.log(err));
    } else {
        // user can't post
        return res.json({ msg: "You are not allowed to create a post for this company!" });
    };
});




module.exports = router;