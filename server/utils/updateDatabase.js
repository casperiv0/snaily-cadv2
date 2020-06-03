const { processQuery } = require("./db");


function updateDatabase() {
    processQuery(`ALTER TABLE \`cad_info\` ADD \`company_whitelisted\` VARCHAR(255) NOT NULL AFTER \`whitelisted\`; ALTER TABLE \`bleets\` ADD \`pinned\` VARCHAR(255) NOT NULL AFTER \`file_dir\`; ALTER TABLE \`businesses\` ADD \`business_address\` VARCHAR(255) NOT NULL AFTER \`whitelisted\`; `)
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