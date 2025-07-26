const chalk = require("chalk");
const moment = require("moment");

module.exports = class Logger {
	static log (content, type = "log") {
		const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
		switch (type) {
	
		case "log": {
			return console.log(`OK |  [${chalk.black.bgBlue(type.toUpperCase())}] ${chalk.blue(content)}`);
		}
		case "warn": {
			return console.log(`OK |  [${chalk.black.bgYellow(type.toUpperCase())}] ${chalk.blue(content)}`);
		}
		case "error": {
			return console.log(`OK |  [${chalk.black.bgRed(type.toUpperCase())}] ${chalk.blue(content)}`);
		}
		case "debug": {
			return console.log(`OK |  [${chalk.black.bgGreen(type.toUpperCase())}] ${chalk.blue(content)}`);
		}
		case "cmd": {
			return console.log(`OK |  [${chalk.black.bgWhite(type.toUpperCase())}] ${chalk.blue(content)}`);
		}
		case "event": {
			return console.log(`OK |  [${chalk.black.bgHex('#e1f507')(type.toUpperCase())}] ${chalk.blue(content)}`);
		}
		case "ready": {
			return console.log(`OK |  [${chalk.black.bgHex('#067032')(type.toUpperCase())}] ${chalk.blue(content)}`);
		} 
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
		}
	}
};