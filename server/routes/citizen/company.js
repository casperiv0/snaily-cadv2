/*
    GET / - shows all companies in the CAD
    POST /join - join a company
    POST /create - create a company
    POST /:citizenId/:company
    POST /:citizenId/:company/edit
    POST /:citizenId/:company/create-post
    GET /employees/:employeeId
    GET /:citizenId/:company/vehicles
    GET /:citizenId/:company/pending-citizens
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
        processQuery("UPDATE `citizens` SET `business` = ?, `rank` = ?, `b_status` = ? WHERE `full_name` = ?", [joinedCompany, "employee", "pending", citizenName])
            .then(() => {
                return res.json({ msg: "pending" });
            })
            .catch(err => console.log(err));
    } else {
        processQuery("UPDATE `citizens` SET `business` = ?, `rank` = ?, `b_status` = ? WHERE `full_name` = ?", [joinedCompany, "employee", "accepted", citizenName])
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
router.post("/:citizenId/:companyName", auth, async (req, res) => {
    // Get all the data from the database
    const company = await processQuery("SELECT * FROM `businesses` WHERE `business_name` = ?", [req.params.companyName]);
    const citizen = await processQuery("SELECT linked_to, full_name, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);
    const posts = await processQuery("SELECT * FROM `posts` WHERE `linked_to_bus` = ? ORDER BY `id` DESC", [req.params.companyName]);

    // Check if company & citizen exist
    if (!company[0]) return res.json({ msg: "Not Found" });
    if (!citizen[0]) return res.json({ msg: "Citizen wasn't found!" });

    // Check if this citizen works here
    if (citizen[0].business !== req.params.companyName) return res.json({ msg: "Forbidden" })

    // Check if citizen is from the account
    if (citizen[0].linked_to !== req.user.username) return res.json({ msg: "This citizen is not yours!" });

    // Check if citizen was declined
    if (citizen[0].b_status === "declined") return res.json({ msg: "Declined" });

    // Check if citizen is pending access
    if (citizen[0].b_status === "Pending") return res.json({ msg: "Pending" });

    // send data from the company & citizen
    return res.json({ company: company, citizen: citizen, posts: posts });
});



router.post("/:citizenId/:company/edit", auth, async (req, res) => {
    const { whitelisted } = req.body;

    processQuery("UPDATE `businesses` SET `whitelisted` = ? WHERE `business_name` = ?", [whitelisted, req.params.company]).then(() => {
        return res.json({ msg: "Updated" })
    }).catch(err => console.log(err));
});

/*
    @Route /:citizenId-:company/create-post
    @Auth Protected
*/
router.post("/:citizenId/:company/create-post", auth, async (req, res) => {
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

        if (title && description) {
            processQuery("INSERT INTO `posts` (`linked_to_bus`, `title`, `description`, `uploadedBy`, `uploadedAt`) VALUES (?, ?, ?, ?, ?)", [req.params.company, title, description, uploadedBy, uploadedAt])
                .then(post => {
                    return res.json({ msg: "Created" })
                })
                .catch(err => console.log(err));
        } else {
            return res.json({ msg: "Please fill in all fields!" })
        }

    } else {
        // user can't post
        return res.json({ msg: "You are not allowed to create a post for this company!" });
    };
});


/*
    @Route /:citizenId/:company/employees
    @Auth Protected
*/
router.get("/:citizenId/:company/employees", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);


    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })


    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        processQuery("SELECT id, full_name, business, vehicle_reg, posts, b_status, rank  FROM `citizens` WHERE `business` = ?", [req.params.company])
            .then(employees => {
                return res.json({ employees: employees })
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    }
})


/*
    @Route /:citizenId/:company/employees/:employeeId
    @Auth Protected
*/
router.get("/:citizenId/:company/employees/:employeeId", auth, async (req, res) => {
    const citizen = await processQuery("SELECT full_name, linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]).catch(err => console.log(err));
    const employee = await processQuery("SELECT full_name, linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.employeeId]).catch(err => console.log(err));


    if (!citizen[0]) return res.json({ msg: "Not Found" })
    if (!employee[0]) return res.json({ msg: "Not Found" })

    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" });

    // validate employee
    if (employee[0].business !== req.params.company) return res.json({ msg: "citizen Is not working here" });


    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        return res.json({ employee: employee })
    } else {
        return res.json({ msg: "Forbidden" })
    }
})

/*
    @Route /:citizenId/:company/employees/:employeeId
    @Auth Protected
*/
router.post("/:citizenId/:company/employees/:employeeId", auth, async (req, res) => {
    const citizen = await processQuery("SELECT full_name, linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]).catch(err => console.log(err));
    const employee = await processQuery("SELECT full_name, linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.employeeId]).catch(err => console.log(err));


    if (!citizen[0]) return res.json({ msg: "Citizen Not Found" })
    if (!employee[0]) return res.json({ msg: "Employee Not Found" })

    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" });

    // validate employee
    if (employee[0].business !== req.params.company) return res.json({ msg: "citizen Is not working here" });

    const { rank, vehicle_reg, posts } = req.body;

    if (rank && vehicle_reg && posts) {

        if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
            processQuery("UPDATE `citizens` SET `rank` = ?, `vehicle_reg` = ?, `posts` = ? WHERE `id` = ?", [rank, vehicle_reg, posts, req.params.employeeId])
                .then(() => {
                    return res.json({ msg: "Updated" })
                })
                .catch(err => console.log(err));
        } else {
            return res.json({ msg: "Forbidden" })
        }
    } else {
        return res.json({ msg: "Please fill in all fields!" })
    };
});

/*
    @Route /:citizenId/:company/vehicles
    @Auth Protected
*/
router.get("/:citizenId/:company/vehicles", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);


    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })


    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        processQuery("SELECT id, plate, in_status, vehicle, owner  FROM `registered_cars` WHERE `company` = ?", [req.params.company])
            .then(vehicles => {
                return res.json({ vehicles: vehicles })
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    }
})


/*
    @Route /:citizenId/:company/pending-citizens
    @Auth Protected
*/
router.get("/:citizenId/:company/pending-citizens", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);


    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })


    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        processQuery("SELECT id, full_name  FROM `citizens` WHERE `business` = ? AND `b_status` = ?", [req.params.company, "pending"])
            .then(citizens => {
                return res.json({ citizens: citizens })
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    }
})

/*
    @Route /:citizenId/:company/accept/:employeeId
    @Auth Protected
*/
router.put("/:citizenId/:company/accept/:employeeId", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);

    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })


    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        processQuery("UPDATE `citizens` SET `b_status` = ? WHERE `id` = ?", ["accepted", req.params.employeeId])
            .then(() => {
                return res.json({ msg: "Accepted" })
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    }
})

/*
    @Route /:citizenId/:company/decline/:employeeId
    @Auth Protected
*/
router.put("/:citizenId/:company/decline/:employeeId", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);


    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })


    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        processQuery("UPDATE `citizens` SET `b_status` = ? WHERE `id` = ?", ["declined", req.params.employeeId])
            .then(() => {
                return res.json({ msg: "Declined" })
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    }
})





module.exports = router;