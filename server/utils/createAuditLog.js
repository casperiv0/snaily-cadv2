const { processQuery } = require("./db");

/**
 * @param {string} title
*/
function createAuditLog(title) {
    if (!title || title === "") throw Error("createAuditLog function requires argument.");
    const timestamp = new Date().toLocaleString();

    processQuery("INSERT INTO `action_logs` (`action_title`, `date`) VALUES (?, ?)", [title, timestamp])
        .catch(err => console.log(err));
};

module.exports = createAuditLog;