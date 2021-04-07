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

	const handleDelete = async (event, id) => {
		event.preventDefault();
		try {
			const response = await fetch(`/api/cantaloupe/cart/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/cart');
		}
	};

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
									<hr />
								</th>
								<th>
									<p className="emphasize">Item Price</p>
									<hr />
								</th>
								<th>
									<p className="emphasize">Quantity</p>
									<hr />
								</th>
								<th>
									<p className="emphasize">Total Price</p>
									<hr />
								</th>
							</tr>
							{cart.map(item => {
								return (
									<tr key={item._id}>
										<td className="image-column">
											<img src={item.product.image} className="product-image" />
										</td>
										<td className="product-details-column">
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
											<button
												className="delete-shopping-cart-item"
												onClick={event => handleDelete(event, item._id)}
											>
												Remove
											</button>
											{/* <a href={`/api/cantaloupe/cart/${item._id}`} className="remove-link">
												
											</a> */}
										</td>
										<td className="price-column">
											<p>${item.product.price}</p>
										</td>
										<td className="qty-column">
											<p>{item.product.qty}</p>
										</td>
										<td className="total-column">
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
							<p>
								Subtotal <span className="right-align">${cartTotal}</span>
							</p>
							<p>
								Shipping <span className="right-align">TBD</span>
							</p>
							<p>
								Estimated Tax <span className="right-align">$0</span>
							</p>
							<p className="emphasize">
								Total <span className="right-align">${cartTotal}</span>
							</p>
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
