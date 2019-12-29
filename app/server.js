const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');

/*
*	Server class.
*
*	@param <_PORT>: Port number of server
*/

class Server
{
	constructor( _PORT )
	{
		this.PORT = _PORT;
		this.app = express();
	}

	init()
	{
		//Express settings
		this.app.use( bodyParser.urlencoded( {"extended": false} ) );
		this.app.use( bodyParser.json() );



		//Setup routes
		var routes = new Array();
		var routes_files = fs.readdirSync( __dirname + "/routes" );
		routes_files.forEach( (routeFile) =>
		{
			routes.push( require( __dirname + '/routes/' + routeFile) );
		});
		this.app.use( "/cotizacion", routes );



		//Catch all other routes (Error 404)
		this.app.use( (request, response) => {
			response.status(404).json(
				{
					"message": "404 Not Found",
					"status": 404
				}
			);
		});



		//Handling errors (Error 500)
		this.app.use( (error, request, response, next) => {
			response.status(error.status || 500).json(
				{
					"error": error.message,
					"status": 500
				}
			);
		});



		//Start server
		this.app.listen( this.PORT, () =>
		{
			console.log(`Server is running on port: ${this.PORT}`);
		});
	}
}

module.exports = Server;