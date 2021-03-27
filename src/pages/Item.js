import React, { useState, useEffect, useRef } from 'react';

export default function Item(props) {
	console.log('testing props');
	console.log(props);
	const items = props.location.state;
	console.log(items);
	const [item, setItem] = useState({});
	const productId = useRef();
	const price = useRef();
	const qty = useRef();
	const size = useRef();

	let foundProductIdBySize = '';
	const findProductBySize = item => {
		const foundProduct = items.filter(product => {
			return product.name == item.name;
		});
		console.log(foundProduct);
		for (let i = 0; i < foundProduct.length; i++) {
			if (size.current.value == foundProduct[i].size) {
				foundProductIdBySize = foundProduct[i]._id;
			}
		}
		console.log('in the function' + foundProductIdBySize);
	};

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
		e.preventDefault();
		const totalPrice = item.price * qty.current.value;
		findProductBySize(item);
		console.log('before try' + foundProductIdBySize);
		try {
			const response = await fetch('/api/cantaloupe/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					product: {
						id: foundProductIdBySize,
						price: item.price,
						qty: qty.current.value
					},
					totalPrice: totalPrice,
					totalQty: qty.current.value
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
					<h3>{item.name}</h3>
					<h3>${item.price}</h3>
					<h3>description</h3>
					<form onSubmit={addToCart}>
						<label>Size:</label>
						<select id="size" ref={size}>
							<option value="XS">X-Small</option>
							<option value="S">Small</option>
							<option value="M">Medium</option>
							<option value="L">Large</option>
						</select>
						<label>Quantity:</label>
						<select id="quantity" ref={qty}>
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
