import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
	return (
		<nav className="NavBar">
			<div className="nav-banner">New Spring Collection Has Landed!</div>
			<h1 className="brand-name">
				<a href="/">C a n t a l o u p e</a>
			</h1>
			<div className="categories">
				<Link key={'Clothing'} to={'/clothing'}>
					<h2 className="category-name">Clothing</h2>
				</Link>
				<Link key={'Activewear'} to={'/activewear'}>
					<h2 className="category-name">Activewear</h2>
				</Link>
				<Link key={'Accessories'} to={'/accessories'}>
					<h2 className="category-name">Accessories</h2>
				</Link>
				<Link key={'Sale'} to={'/sale'}>
					<h2 className="category-name sale">Sale</h2>
				</Link>
				<Link key={'ShoppingCart'} to={'/cart'}>
					<h2 className="category-name">Shopping Cart</h2>
				</Link>
			</div>
			<hr />
		</nav>
	);
};

export default NavBar;
