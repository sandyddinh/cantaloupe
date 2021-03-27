import React, { useEffect, useState } from 'react';

export default function Checkout(props) {
	const cartTotal = props.location.state;
	console.log(cartTotal);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const response = await fetch('/api/cantaloupe/cart');
	// 			const data = await response.json();
	// 			setCart(data);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	})();
	// }, []);

	return (
		<div className="CheckoutPage">
			<h1>Checkout</h1>
			<h4>Your Total: ${cartTotal}</h4>
			<form id="checkout-form">
				<div className="form-row">
					<label htmlFor="name">Name</label>
					<input type="text" id="name" required />
				</div>
				<div className="form-row">
					<label htmlFor="address">Address</label>
					<input type="text" id="address" required />
				</div>
				<div className="form-row">
					<label htmlFor="card-name">Card Holder Name</label>
					<input type="text" id="card-name" required />
				</div>
				<div className="form-row">
					<label htmlFor="card-number">Credit Card Number</label>
					<input type="text" id="card-number" required />
				</div>
				<div className="form-row">
					<label htmlFor="card-expiry-month">Expiration Month</label>
					<input type="text" id="card-expiry-month" placeholder="MM" required />
				</div>
				<div className="form-row">
					<label htmlFor="card-expiry-year">Expiration Year</label>
					<input
						type="text"
						id="card-expiry-year"
						placeholder="YYYY"
						required
					/>
				</div>
				<div className="form-row">
					<label htmlFor="card-cvc">CVC</label>
					<input type="text" id="card-cvc" required />
				</div>
				<input type="Submit" value="Submit Purchase" />
			</form>
		</div>
	);
}
