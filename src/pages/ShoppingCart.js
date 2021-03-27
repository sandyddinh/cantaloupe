import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingCart(props) {
	const [cart, setCart] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);

	const calculateTotal = data => {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i].totalPrice;
		}
		setCartTotal(total);
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cantaloupe/cart');
				const data = await response.json();
				setCart(data);
				calculateTotal(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="ShoppingCartPage">
			{cartTotal > 0 ? (
				<div className="cart-container">
					{cart.map(item => {
						return (
							<div key={item._id}>
								<h4>Product ID: {item.product.id}</h4>
								<h4>Qty: {item.product.qty}</h4>
								<h4>Price: {item.product.price}</h4>
							</div>
						);
					})}
					<h4>Total Price: ${cartTotal}</h4>
					<Link to={{ pathname: `/checkout`, state: cartTotal }}>Checkout</Link>
				</div>
			) : (
				<div>
					<h2>Your cart is empty</h2>
					<h3>Continue Shopping Link</h3>
				</div>
			)}
		</div>
	);
}
