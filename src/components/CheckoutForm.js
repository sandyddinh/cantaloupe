import React, { useState, useEffect } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
	CardElement
} from 'react-stripe-elements';

function CheckoutForm(props) {
	console.log(props);
	// console.log(this.props.elements);
	console.log(props.elements);

	const secret_key =
		'sk_test_51IZiVpCZzgAQXehg6ZnMvqWFR4woJK7jePrXfYN7di6pAyIfYahcz1nkpZgDwlgEw1N1QP6mmuLHwm6GbmguxQx800Bbs0qenG';

	const handleSubmit = ev => {
		// We don't want to let default form submission happen here, which would refresh the page.
		ev.preventDefault();

		// Use Elements to get a reference to the Card Element mounted somewhere
		// in your <Elements> tree. Elements will know how to find your Card Element
		// because only one is allowed.
		// See our getElement documentation for more:
		// https://stripe.com/docs/stripe-js/reference#elements-get-element
		const cardElement = props.elements.getElement('card');

		// From here we can call createPaymentMethod to create a PaymentMethod
		// See our createPaymentMethod documentation for more:
		// https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
		props.stripe
			.createPaymentMethod({
				type: 'card',
				card: cardElement,
				billing_details: { name: 'Jenny Rosen' }
			})
			.then(({ paymentMethod }) => {
				console.log('Received Stripe PaymentMethod:', paymentMethod);
			});

		// You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
		// See our confirmCardPayment documentation for more:
		// https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
		props.stripe.confirmCardPayment(secret_key, {
			payment_method: {
				card: cardElement
			}
		});

		// You can also use confirmCardSetup with the SetupIntents API.
		// See our confirmCardSetup documentation for more:
		// https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
		props.stripe.confirmCardSetup(secret_key, {
			payment_method: {
				card: cardElement
			}
		});

		// You can also use createToken to create tokens.
		// See our tokens documentation for more:
		// https://stripe.com/docs/stripe-js/reference#stripe-create-token
		// With createToken, you will not need to pass in the reference to
		// the Element. It will be inferred automatically.
		props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' });
		// token type can optionally be inferred if there is only one Element
		// with which to create tokens
		// this.props.stripe.createToken({name: 'Jenny Rosen'});

		// You can also use createSource to create Sources.
		// See our Sources documentation for more:
		// https://stripe.com/docs/stripe-js/reference#stripe-create-source
		// With createSource, you will not need to pass in the reference to
		// the Element. It will be inferred automatically.
		props.stripe.createSource({
			type: 'card',
			owner: {
				name: 'Jenny Rosen'
			}
		});
	};

	return (
		<div className="CheckoutForm">
			<form id="checkout-form" onSubmit={handleSubmit}>
				{/* <div className="form-row">
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
				</div> */}

				<label>
					Card details
					<CardNumberElement />
				</label>
				<label>
					Expiration date
					<CardExpiryElement />
				</label>
				<label>
					CVC
					<CardCVCElement />
				</label>

				<input type="Submit" value="Confirm Order" />
			</form>
		</div>
	);
}

export default injectStripe(CheckoutForm);
