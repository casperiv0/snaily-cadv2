const { processQuery } = require("./db");

function createAuditLog(title) {
    const timestamp = new Date().toLocaleString();

    processQuery("INSERT INTO `action_logs` (`action_title`, `date`) VALUES (?, ?)", [title, timestamp])
        .catch(err => console.log(err));
};

module.exports = createAuditLog;