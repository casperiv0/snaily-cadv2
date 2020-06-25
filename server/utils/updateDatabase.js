const { processQuery } = require("./db");

function updateDatabase() {
    processQuery(`
    ALTER TABLE \`weapons\` ADD \`default_weapon\` VARCHAR(255) NOT NULL AFTER \`name\`;
    CREATE TABLE \`truck_logs\` (
        \`id\` int(11) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`timestamp\` varchar(255) NOT NULL,
        \`co_driver\` varchar(255) NOT NULL,
        \`start_time\` varchar(255) NOT NULL,
        \`plate\` varchar(255) NOT NULL,
        \`linked_to\` varchar(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      ALTER TABLE \`truck_logs\`
    ADD PRIMARY KEY (\`id\`);
    ALTER TABLE \`truck_logs\`
    MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT;
    COMMIT;
    ALTER TABLE \`bleets\` ADD \`likes\` INT NOT NULL AFTER \`pinned\`;
     ALTER TABLE \`cad_info\` ADD \`company_whitelisted\` VARCHAR(255) NOT NULL AFTER \`whitelisted\`;
      ALTER TABLE \`bleets\` ADD \`pinned\` VARCHAR(255) NOT NULL AFTER \`file_dir\`;
       ALTER TABLE \`businesses\` ADD \`business_address\` VARCHAR(255) NOT NULL AFTER \`whitelisted\`; `)
        .then(() => {
            console.log("Updated database for latest version");
        }).catch(err => {
            if (err.code === "ER_TABLE_EXISTS_ERROR" || err.code === "ER_DUP_FIELDNAME") {
                console.log("");
            } else {
                console.log(err);
            };
        });
};

module.exports = updateDatabase