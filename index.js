

const Server = require("./app/server");
require("./app/config");

let server = new Server( config.SERVER_PORT );

server.init();