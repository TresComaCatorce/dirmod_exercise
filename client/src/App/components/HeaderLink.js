import React from "react";
import PropTypes from 'prop-types';

export class HeaderLink extends React.Component
{
	render()
	{
		return(
			<li className="nav-item">
				<a className="nav-link" href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.displayName}</a>
			</li>
		);
	}
}

HeaderLink.propTypes =
{
	url: PropTypes.string,
	displayName: PropTypes.string
}