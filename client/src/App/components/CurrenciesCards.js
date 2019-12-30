import React from "react";

import { Loading } from "../components/Loading";

export class CurrenciesCards extends React.Component
{
	render()
	{
		const { error, isLoaded, items } = this.props.data;

		if(error)
		{
			return(
				<div className="alert alert-danger" role="alert">
					Error al obtener la cotizaci&oacute;n de las divisas
				</div>
			);
		}

		if( !isLoaded )
		{
			return(
			<Loading/>);
		}
		else
		{
			return(
				<div className="row align-center">
					{ items.map( item =>
						(
							<div className="col-12 col-sm-4" key={item.moneda}>
								<div className="card">
									<div className="overlay-image-container">
										<img className="card-img-top" src={item.img} alt={item.moneda}/>
										<div className="overlay-content">
											<h1>
												AR$ {item.precio}
											</h1>
										</div>
									</div>
									<div className="card-body bg-dark">
										<h1 className="card-title text-light">
											{item.moneda}
										</h1>
									</div>
								</div>
							</div>
						)
					)}
				</div>
			);
		}
	}
}