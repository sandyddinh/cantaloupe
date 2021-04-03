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

	// const handleCheckout = e => {
	// 	e.preventDefault();
	// 	history.push('/checkout');
	// };

	return (
		<div className="ShoppingCartPage">
			{cart.length ? (
				<div className="cart-container">
					{cart.map(item => {
						return (
							<div key={item._id}>
								<img src={item.product.image} />
								<h4>Name: {item.product.name}</h4>
								<h4>Product ID: {item.product.id}</h4>
								<h4>Color: {item.product.color}</h4>
								<h4>Size: {item.product.size}</h4>
								<h4>Qty: {item.product.qty}</h4>
								<h4>Item Price: {item.product.price}</h4>
								<h4>Total Price: {item.product.price * item.product.qty}</h4>
							</div>
						);
					})}
					<h4>Total Price: ${cartTotal}</h4>
					{/* <Link to={{ pathname: `/checkout`, state: cartTotal }}>Checkout</Link> */}
					{/* <button type="button" onClick={handleCheckout}> */}
					<Link to={{ pathname: '/checkout', state: cartTotal }}>Checkout</Link>
					{/* </button> */}
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
