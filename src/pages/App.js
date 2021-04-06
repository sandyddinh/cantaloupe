import React, { useState } from 'react';

export default function App(props) {
	return (
		<div className="AppPage">
			<div className="top-section">
				<img src="https://res.cloudinary.com/dxuoqqfve/image/upload/v1617661481/cantaloupe/spring-collection_pz7qdd.jpg" />
			</div>
			<div className="bottom-section">
				<div className="bottom-left-section">
					<img src="https://res.cloudinary.com/dxuoqqfve/image/upload/v1617661481/cantaloupe/new-to-activewear_maex8z.jpg" />
				</div>
				<div className="bottom-right-section">
					<img src="https://res.cloudinary.com/dxuoqqfve/image/upload/v1617661481/cantaloupe/winter-sale_wu0yaa.jpg" />
				</div>
			</div>
			{/* <ul>
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
			</ul> */}
		</div>
	);
}
