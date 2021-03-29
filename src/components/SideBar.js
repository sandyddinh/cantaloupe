import React from 'react';

const SideBar = props => {
	return (
		<nav className="SideBar">
			<div className="side-container">
				Browse By:
				<ul>
					<ol>Sweaters</ol>
					<ol>Pants</ol>
					<ol>Tops</ol>
					<ol>Bottoms</ol>
				</ul>
			</div>
		</nav>
	);
};

export default SideBar;
