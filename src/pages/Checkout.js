import React, { useEffect } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout(props) {
	const cartTotal = props.location.state;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="CheckoutPage">
			<div className="checkout-right">
				<h2>C a n t a l o u p e</h2>
				<p>Cart > Checkout</p>
				<div className="order-summary">
					<h4>Order Summary</h4>
					<hr />
					<div className="order-details">
						<p>
							Subtotal <span className="right-align">${cartTotal}</span>
						</p>
						<p>
							Shipping <span className="right-align">FREE</span>
						</p>
						<hr />
						<p className="emphasize">
							Total <span className="right-align">${cartTotal}</span>
						</p>
					</div>
				</div>
				<StripeProvider apiKey="pk_test_51IZiVpCZzgAQXehgNyiD7QAjXdkj3tKCkXWGvW2p483FNIKp0iFIJGXgo6dqXsGYuCRDfrJWvK0nXzgmHSMSlL5B00mWENHgJi">
					<Elements>
						<CheckoutForm props={props} />
					</Elements>
				</StripeProvider>
			</div>
		</div>
	);
}
