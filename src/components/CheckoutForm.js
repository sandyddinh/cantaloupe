import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe
} from 'react-stripe-elements';
import axios from 'axios';

function CheckoutForm(props) {
	const totalAmount = props.props.location.state;

	if (totalAmount === 0) props.props.history.push('/');

	const [receiptUrl, setReceiptUrl] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		const { token } = await props.stripe.createToken();

		const order = await axios.post('http://localhost:3000/api/stripe/charge', {
			amount: (totalAmount * 100).toString().replace('.', ''),
			source: token.id,
			receipt_email: 'support@cataloupe.com'
		});

		setReceiptUrl(order.data.charge.receipt_url);
	};

	if (receiptUrl) {
		return (
			<div className="success">
				<h2>Payment Successful!</h2>
				<a href={receiptUrl}>View Receipt</a>
				<Link to="/">Home</Link>
			</div>
		);
	}

	return (
		<div className="checkout-form">
			<form onSubmit={handleSubmit}>
				<label>Shipping Address</label>
				<div className="checkout-form-line-1">
					<div className="form-group">
						<input type="text" id="name" placeholder="Name"></input>
					</div>
				</div>
				<div className="checkout-form-line-2">
					<div className="form-group">
						<input type="text" id="email" placeholder="Email"></input>
					</div>
				</div>
				<div className="checkout-form-line-2">
					<div className="form-group">
						<input type="text" id="phone" placeholder="Phone"></input>
					</div>
				</div>
				<div className="checkout-form-line-3">
					<div className="form-group">
						<input type="text" id="address" placeholder="Address"></input>
					</div>
				</div>
				<div className="checkout-form-line-4">
					<div className="form-group">
						<input type="text" id="city" placeholder="City"></input>
					</div>
					<div className="form-group">
						<input type="text" id="state" placeholder="State"></input>
					</div>
					<div className="form-group">
						<input type="text" id="zip" placeholder="ZIP"></input>
					</div>
				</div>
				<label id="card-number">
					Card Number
					<CardNumberElement />
				</label>
				<label id="card-exp-date">
					Exp
					<CardExpiryElement />
				</label>
				<label id="card-cvc-number">
					CVC
					<CardCVCElement />
				</label>
				<button type="submit" className="order-button">
					Pay
				</button>
			</form>
		</div>
	);
}

export default injectStripe(CheckoutForm);
