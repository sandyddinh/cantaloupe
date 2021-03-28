import React, { useEffect, useState } from 'react';
import { Elements, injectStripe, CardElement } from 'react-stripe-elements';
import { StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout(props) {
	const cartTotal = props.location.state;
	console.log(cartTotal);

	console.log(props);

	return (
		<div className="CheckoutPage">
			<h1>Checkout</h1>
			<h4>Your Total: ${cartTotal}</h4>
			<StripeProvider apiKey="pk_test_51IZiVpCZzgAQXehgNyiD7QAjXdkj3tKCkXWGvW2p483FNIKp0iFIJGXgo6dqXsGYuCRDfrJWvK0nXzgmHSMSlL5B00mWENHgJi">
				<Elements>
					<CheckoutForm />
				</Elements>
			</StripeProvider>
		</div>
	);
}
