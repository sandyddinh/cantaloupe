import React, { useEffect } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout(props) {
	// const cartTotal = props.location.state;
	// console.log(cartTotal);
	console.log(props);
	console.log(props.location.state);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="CheckoutPage">
			<h1>Checkout</h1>
			<h4>Your Total: </h4>
			<StripeProvider apiKey="pk_test_51IZiVpCZzgAQXehgNyiD7QAjXdkj3tKCkXWGvW2p483FNIKp0iFIJGXgo6dqXsGYuCRDfrJWvK0nXzgmHSMSlL5B00mWENHgJi">
				<Elements>
					<CheckoutForm props={props} />
					{/* <CheckoutForm history={props.history} /> */}
				</Elements>
			</StripeProvider>
		</div>
	);
}
