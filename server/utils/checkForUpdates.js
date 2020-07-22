const fetch = require("node-fetch")
const package = require("../../package.json");
const chalk = require("chalk");

async function checkForUpdates() {
    const result = await fetch("https://dev-caspertheghost.github.io/version").then(res => res.json());
    
    if (result.snailycad !== package.version) {
        console.log(chalk.red.bold(`
-------------------------------\n
WARNING:         
Your Version is out of date!
Your Version: ${package.version}
Updated Version: ${result.snailycad}
Please Pull the latest version on the GitHub page: https://github.com/Dev-CasperTheGhost/snaily-cad Or Run: git pull origin master\n

-------------------------------\n
`))
    } else {
        console.log(chalk.green("You're all up to date."))
    }

}

module.exports = checkForUpdates;
