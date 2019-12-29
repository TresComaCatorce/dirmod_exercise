const express = require("express");
const requestPromise = require("request-promise-native");
const format = require("string-template");
const router = express.Router();


router.get( "/:currency", ( request, response, next ) =>
{
	try
	{
		//Reads & check if the currency is correct
		let CURRENCY_PARAM = request.params.currency;
		let CURRENCY_CODE;
		if(!CURRENCY_PARAM) return next( new Error("Currency is required") );

		switch(CURRENCY_PARAM)
		{
			case "dolar":
				CURRENCY_CODE = config.DOLAR_CODE;
				break;

			case "euro":
				CURRENCY_CODE = config.EURO_CODE;
				break;

			case "real":
				CURRENCY_CODE = config.REAL_CODE;
				break;

			default:
				return next( new Error("Incorrect currency") );
				break;
		}
	
		//Setup the request to send to the "convertion API"
		let API_URL = format( config.CAMBIO_URL,
			{
				SOURCE_CURRENCY: CURRENCY_CODE,
				TARGET_CURRENCY: config.PESO_CODE
			}
		);
	
		var options = {
			uri: API_URL,
			qs: {
				quantity: "1",
				key: config.CAMBIO_API_KEY
			},
			json: true
		};
		
		//Send the request to the "convertion API".
		requestPromise(options)

			//If the server response is OK
			.then( (data) =>
			{
				if( !data.result || !data.result.value ) return next( new Error("Server Error") );
				response.send(
					{
						moneda: CURRENCY_PARAM,
						precio: data.result.value
					}
				);
			})

			//If the server throw a error
			.catch( (err) =>
			{
				response.send(err);
			});
	}
	catch (error)
	{
		return next( error )
	}

});

module.exports = router;