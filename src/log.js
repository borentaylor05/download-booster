const chalk = require('chalk');

function error(message) {
    console.log(chalk.white.bgRed(`\n${message}`));
}

function info(message) {
    console.log(chalk.yellow(message));
}

function success(message) {
    console.log(chalk.green(message));
}

module.exports = {
    success,
    info,
    error
};
