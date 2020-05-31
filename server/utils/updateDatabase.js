const { processQuery } = require("./db");


function updateDatabase() {
    processQuery(`ALTER TABLE \`businesses\` ADD \`business_address\` VARCHAR(255) NOT NULL AFTER \`whitelisted\`; `)
        .then(res => {
            console.log("Updated database for latest version");
        }).catch(err => {
            if (err.code === "ER_DUP_FIELDNAME") {
                console.log("");
            } else {
                console.log(err);
            };
        });
};


module.exports = updateDatabase