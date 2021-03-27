import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
	return (
		<nav className="NavBar">
			{/* {props.routes
				.filter(page => !page.path.includes(':') || !page.key == 'App')
				.map(({ key, path }) => (
					<Link key={key} to={path}>
						{key}
					</Link>
				))} */}
			<Link key={'Clothing'} to={'/clothing'}>
				Clothing
			</Link>
			<Link key={'Activewear'} to={'/activewear'}>
				Activewear
			</Link>
			<Link key={'Accessories'} to={'/accessories'}>
				Accessories
			</Link>
			<Link key={'Sale'} to={'/sale'}>
				Sale
			</Link>
			<Link key={'ShoppingCart'} to={'/cart'}>
				Shopping Cart
			</Link>
		</nav>
	);
};

export default NavBar;
