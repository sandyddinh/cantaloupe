import React, { useState } from 'react';

export default function App(props) {
	return (
		<div className="AppPage">
			This is the {props.page} page
			<ul>
				<li>Add a shop now image and link</li>
				<li>Add a section for new arrivals</li>
				<li>Add a footer</li>
				<li>Add Shopping Cart</li>
				<li>Add Stripe Integration</li>
				<li>Add Favorites?</li>
			</ul>
			The pages should be:
			<ul>
				<li>New Arrivals</li>
				<li>Clothing</li>
				<li>Activewear</li>
				<li>Wellness</li>
				<li>Sale</li>
				<li>Gift Card - Maybe</li>
			</ul>
		</div>
	);
}
