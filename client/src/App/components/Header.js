import React from "react";
import PropTypes from 'prop-types';

import { HeaderLink } from "./HeaderLink";

export class Header extends React.Component
{
	render()
	{
		return(
			<nav className="navbar navbar-dark bg-dark">
				<div className="navbar-brand">
					{this.props.data.name}
				</div>
				<div className="navbar-header">
					<ul className="nav navbar-nav">
						{this.props.data.links.map((link) => <HeaderLink displayName={link.displayName} url={link.url} key={link.key}/>)}
					</ul>
				</div>
			</nav>
		);
	}
}

Header.propTypes =
{
	data: PropTypes.object
}