const fs = require('fs'); //Manejo de file system.

try {
	//Load configs
	let rawdata = fs.readFileSync( __dirname + '\\config\\config.json');
	let json_common = JSON.parse(rawdata);
	
	module.exports = config = json_common;
}
catch (error)
{
	console.error("Config file (/config/config.json) doesn't exist or is invalid.");
	process.exit(1);
}
