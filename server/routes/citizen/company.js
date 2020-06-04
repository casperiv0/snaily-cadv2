/*
    GET / - shows all companies in the CAD
    POST /join - join a company
    POST /create - create a company
    POST /:citizenId/:company - company page
    POST /:citizenId/:company/edit - edit company
    POST /:citizenId/:company/create-post - create company post
    GET /employees/:employeeId - edit employee 
    GET /:citizenId/:company/vehicles - all company vehicles
    GET /:citizenId/:company/pending-citizens - all pending citizens
    DELETE /:citizenId/:company/ - delete company
    PUT /:citizenId/:company/fire/:employeeId - fire employee
*/

const router = require("express").Router();
const auth = require("../../auth/tokenAuth");
const { processQuery } = require("../../utils/db");
const createAuditLog = require(".././../utils/createAuditLog");

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

    if (!company[0]) return res.json({ msg: "Company wasn't found!" });

    // check if citizen exists 
    const citizen = await processQuery("SELECT * FROM `citizens` WHERE `full_name` = ?", [citizenName]).catch(err => console.log(err));

    if (!citizen[0]) return res.json({ msg: "Citizen was not found!" });

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
    const { companyName, owner, whitelistStatus, address } = req.body;


    if (companyName && owner && address) {
        const cadInfo = await processQuery("SELECT company_whitelisted FROM `cad_info`").catch(err => console.log(err));

        // Check if company already exists
        const company = await processQuery("SELECT * FROM `businesses` WHERE `business_name` = ?", [companyName]).catch(err => console.log(err));

        if (company[0]) return res.json({ msg: "Company name is already in use!" });

        // check if citizen exists 
        const citizen = await processQuery("SELECT * FROM `citizens` WHERE `full_name` = ?", [owner]).catch(err => console.log(err));

        if (!citizen[0]) return res.json({ msg: "Citizen was not found!" });


        // Check if creating companies is whitelisted
        if (cadInfo[0].company_whitelisted === "true") {
            const user = await processQuery("SELECT rank FROM `users` WHERE `id` = ?", [req.user.id]).catch(err => console.log(err));

            if (user[0].rank === "owner" || user[0].rank === "admin" || user[0].rank === "moderator") {
                // Create the company
                processQuery("INSERT INTO `businesses` (`business_name`, `business_owner`, `linked_to`, `whitelisted`, `business_address`) VALUES (?, ?, ?, ?, ?)",
                    [companyName, owner, req.user.username, whitelistStatus, address]).catch(err => console.log(err))
                processQuery("UPDATE `citizens` SET `business` = ?, `rank` = ? WHERE `citizens`.`full_name` = ?", [companyName, "owner", owner])
                    .then(() => { return res.json({ msg: "Company Created" }) })
                    .catch(err => console.log(err))
            } else {
                return res.json({ msg: "Only moderators+ are allowed to create a company." });
            }
        } else {
            // Create the company
            processQuery("INSERT INTO `businesses` (`business_name`, `business_owner`, `linked_to`, `whitelisted`, `business_address`) VALUES (?, ?, ?, ?, ?)",
                [companyName, owner, req.user.username, whitelistStatus, address]).catch(err => console.log(err))
            processQuery("UPDATE `citizens` SET `business` = ?, `rank` = ? WHERE `citizens`.`full_name` = ?", [companyName, "owner", owner])
                .then(() => { return res.json({ msg: "Company Created" }) })
                .catch(err => console.log(err))
        }
    } else {
        return res.json({ msg: "Company Name, owner and address are required!" })
    };
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
    const { whitelisted, business_address, business_name } = req.body;

    if (business_name !== req.params.company) {
        const existing = await processQuery("SELECT * FROM `businesses` WHERE `business_name` = ?", [business_name]).catch(err => console.log(err));
        if (existing[0]) return res.json({ msg: "Company name already exists, please use a different name!" });
    }


    // Update all citizens & vehicles
    processQuery("UPDATE `citizens` SET `business` = ? WHERE `business` = ?", [business_name, req.params.company]).catch(err => console.log(err));
    processQuery("UPDATE `registered_cars` SET `company` = ? WHERE `company` = ?", [business_name, req.params.company]).catch(err => console.log(err));
    processQuery("UPDATE `posts` SET `linked_to_bus` = ? WHERE `linked_to_bus` = ?", [business_name, req.params.company]).catch(err => console.log(err));


    processQuery("UPDATE `businesses` SET `whitelisted` = ?, `business_address` = ?, `business_name` = ? WHERE `business_name` = ?",
        [whitelisted, business_address, business_name, req.params.company]).then(() => {
            return res.json({ msg: "Updated" })
        }).catch(err => console.log(err));

    createAuditLog(`Company ${req.params.company} was successfully renamed to ${business_name}`);
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


/*
    @Route /:citizenId/:company/
    @Auth Protected
*/
router.delete("/:citizenId/:company/", auth, async (req, res) => {
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [req.params.citizenId]);

    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" })


    if (citizen[0].rank === "owner") {
        processQuery("DELETE FROM `businesses` WHERE `business_name` = ?", [req.params.company])
            .then(() => {
                processQuery("UPDATE `citizens` SET `business` = ? WHERE `id` = ?", ["Not Working Anywhere", req.params.citizenId])
                    .catch(err => console.log(err));
                return res.json({ msg: "Deleted" })
            })
            .catch(err => console.log(err));
    } else {
        return res.json({ msg: "Forbidden" })
    }
})


/*
    @Route /:citizenId/:company/fire/:employeeId
    @Auth Protected
*/
router.put("/:citizenId/:company/fire/:employeeId", auth, async (req, res) => {
    const { citizenId, employeeId } = req.params;
    const citizen = await processQuery("SELECT linked_to, business, rank, vehicle_reg, posts, b_status FROM `citizens` WHERE `id` = ?", [citizenId]);
    const employee = await processQuery("SELECT id, rank, full_name FROM `citizens` WHERE `id` = ?", [employeeId])

    // Check if this citizen works here
    if (citizen[0].business !== req.params.company) return res.json({ msg: "You're not working here" });

    if (employee[0].rank === "owner") {
        return res.json({ msg: "You can't fire the owner!" })
    };

    if (citizen[0].rank === "owner" || citizen[0].rank === "manager") {
        processQuery("UPDATE `citizens` SET `business` = ? WHERE `id` = ?", ["Not Working Anywhere", employeeId])
            .catch(err => console.log(err));
        return res.json({ msg: "Fired" })
    } else {
        return res.json({ msg: "Forbidden" })
    }
});

module.exports = router;