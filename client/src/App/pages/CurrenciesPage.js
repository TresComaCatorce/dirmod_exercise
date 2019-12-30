import React from "react";

import { Header } from "../components/Header";
import { CurrenciesCards } from "../components/CurrenciesCards";

class CurrenciesPage extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			error: null,
			isLoaded: false,
			items: []
		};

		this.currencies = ["dolar", "euro", "real"];
	};

	render()
	{
		let headerData = {
			"name": "Cristian Ferrero",
			"links":
			[
				{"displayName":"Linkedin", "url":"https://www.linkedin.com/in/ferrerocristian92/", "key":"1"}
			]
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12">
						<Header data={headerData}/>
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-xs-12 col-sm-12">
						<div className="align-center">
							<div className="col-12">
								<h2>
									Cotizaci&oacute;n de divisas en pesos Argentinos
								</h2>
							</div>

							<br/>

							<CurrenciesCards data={this.state}/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount()
	{
		setInterval( () => {
			this.loadCurrencies();
		}, 5000);
	}

	loadCurrencies()
	{

		Promise.all(
			this.currencies.map( currency =>
				fetch("/cotizacion/"+currency)
					.then(res => res.json())
					.then(res => {
						if( res.moneda && res.precio && typeof res.precio === "number" )
						{
							console.log("CBF x: ", res);
							res.img = require(`../images/${res.moneda}.jpg`);
							res.precio = res.precio.toFixed(2);
							res.status = 200;
						}
						else
						{
							res.status = 400;
						}
						return res;
					})
			)
		).then(rates => 
		{
			console.log("CBF result: ", rates);
			rates = rates.filter( rate => rate.status===200 );
			if(rates.length>0)
			{
				this.setState({
					isLoaded: true,
					items: [].concat(...rates)
				});
			}
			else
			{
				this.setState({
					error: true
				});
			}
			
		});
	}
}

export default CurrenciesPage;