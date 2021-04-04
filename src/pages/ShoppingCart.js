import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingCart({ history }) {
	const [cart, setCart] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);

	const calculateTotal = data => {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i].product.price * data[i].product.qty;
		}
		setCartTotal(total);
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cantaloupe/cart');
				const data = await response.json();
				await setCart(data);
				await calculateTotal(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="ShoppingCartPage">
			{cart.length ? (
				<>
					<div className="cart-container">
						<h2>Basket</h2>
						<hr />
						<table>
							<tr>
								<th></th>
								<th>
									<p className="emphasize">Item</p>
								</th>
								<th>
									<p className="emphasize">Item Price</p>
								</th>
								<th>
									<p className="emphasize">Quantity</p>
								</th>
								<th>
									<p className="emphasize">Total Price</p>
								</th>
							</tr>
							{cart.map(item => {
								return (
									<tr key={item._id}>
										<td>
											<img src={item.product.image} className="product-image" />
										</td>
										<td>
											<p className="emphasize">{item.product.name}</p>
											<p>
												<span className="emphasize">Style #</span>{' '}
												{item.product.id}
											</p>
											<p>
												<span className="emphasize">Color</span>{' '}
												<span className="uppercase">{item.product.color}</span>
											</p>
											<p>
												<span className="emphasize">Size</span>{' '}
												{item.product.size}
											</p>
											<a href="#" className="remove-link">
												Remove
											</a>
										</td>
										<td>
											<p>${item.product.price}</p>
										</td>
										<td>
											<p>{item.product.qty}</p>
										</td>
										<td>
											<p className="emphasize">
												${item.product.price * item.product.qty}
											</p>
										</td>
									</tr>
								);
							})}
						</table>
					</div>
					<div className="order-summary">
						<h2>Order Summary</h2>
						<div className="order-details">
							<p>Subtotal: ${cartTotal}</p>
							<p>Shipping: TBD</p>
							<p>Estimated Tax: $0</p>
							<p className="emphasize">Total: ${cartTotal}</p>
							<Link to={{ pathname: '/checkout', state: cartTotal }}>
								<button type="button" className="checkout-button">
									Checkout
								</button>
							</Link>
						</div>
					</div>
				</>
			) : (
				<div>
					<h2>Your cart is empty</h2>
					<h3>Continue Shopping Link</h3>
				</div>
			)}
		</div>
	);
}
