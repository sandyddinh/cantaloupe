import React, { useState, useEffect, useRef } from 'react';

export default function Item(props) {
	const [item, setItem] = useState({});
	const productId = useRef();
	const price = useRef();
	const qty = useRef();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/cantaloupe/${props.match.params.id}`
				);
				const data = await response.json();
				setItem(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const addToCart = async e => {
		const totalPrice = price.current.value * quantity.current.value;
		e.preventDefault();
		try {
			const response = await fetch('/api/cantaloupe/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					product: {
						id: productId.current.value,
						price: price.current.value,
						qty: quantity.current.value
					},
					totalPrice: totalPrice,
					totalQty: quantity.current.value
				})
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="ItemPage">
			{Object.keys(item).length ? (
				<div>
					<img src={`${item.image[0]}`} />
					<form onSubmit={addToCart}>
						{/* <h3>{item.name}</h3>
						<h3>${item.price}</h3>	 */}
						<input type="text">{item.name}</input>
						<input type="text" ref={productId}>
							{item._id}
						</input>
						$
						<input type="text" ref={price}>
							{item.price}
						</input>
						<h3>description</h3>
						<label>Size:</label>
						<select id="size">
							<option value="xs">X-Small</option>
							<option value="s">Small</option>
							<option value="m">Medium</option>
							<option value="l">Large</option>
						</select>
						<label>Quantity:</label>
						<select id="quantity" ref={quantity}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
						<input
							type="submit"
							className="addToCartButton"
							value={`Add to Cart ${item.price}`}
						/>
						{/* Add Logic for Sale Item */}
					</form>
				</div>
			) : (
				''
			)}
		</div>
	);
}
