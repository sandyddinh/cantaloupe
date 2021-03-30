import React from 'react';

const SideBar = props => {
	return (
		<nav className="SideBar">
			<div className="side-container">
				Browse By:
				<hr />
				<ul>
					<ol>
						<a href="/">
							Sweaters<span className="expand-filter">+</span>
						</a>
					</ol>
					<hr />
					<ol>
						<a href="/">
							Pants<span className="expand-filter">+</span>
						</a>
					</ol>
					<hr />
					<ol>
						<a href="/">
							Tops<span className="expand-filter">+</span>
						</a>
					</ol>
					<hr />
					<ol>
						<a href="/">
							Bottoms<span className="expand-filter">+</span>
						</a>
						<hr />
					</ol>
				</ul>
			</div>
		</nav>
	);
};

export default SideBar;
