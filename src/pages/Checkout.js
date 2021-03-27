import React, { useEffect, useState } from 'react';
import {
	CardElement,
	Elements,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function Checkout(props) {
	const cartTotal = props.location.state;
	console.log(cartTotal);

	

	const stripe = useStripe();
	const elements = useElements();

	const handleCheckout = async e => {
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement
		});

		if (error) {
			console.log('[error]', error);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
		}
	};

	return (
		<div className="CheckoutPage">
			<h1>Checkout</h1>
			<h4>Your Total: ${cartTotal}</h4>
			<form onSubmit={handleCheckout}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4'
								}
							},
							invalid: {
								color: '#9e2146'
							}
						}
					}}
				/>
				<button type="submit" disabled={!stripe}>
					Pay
				</button>
			</form>
			{/* <form id="checkout-form" onSumbit={handleCheckout}>
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
			</form> */}
		</div>
	);
}

const stripePromise = loadStripe(
    'pk_test_51IZiVpCZzgAQXehgNyiD7QAjXdkj3tKCkXWGvW2p483FNIKp0iFIJGXgo6dqXsGYuCRDfrJWvK0nXzgmHSMSlL5B00mWENHgJi'
);

const App = () => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
  };
  
  export default App;