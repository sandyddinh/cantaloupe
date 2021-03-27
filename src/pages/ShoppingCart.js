import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingCart(props) {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cantaloupe/cart');
				const data = await response.json();
				setCart(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="ShoppingCartPage">
			{cart.map(item => {
				return (
					<div key={item._id}>
						<h4>Product ID: {item.product.id}</h4>
						<h4>Qty: {item.product.qty}</h4>
						<h4>Price: {item.product.price}</h4>
						<h4>Total Qty: {item.totalQty}</h4>
						<h4>Total Price: {item.totalPrice}</h4>
					</div>
				);
			})}
		</div>
	);
}
