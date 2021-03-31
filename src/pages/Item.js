import React, { useState, useEffect, useRef } from 'react';

export default function Item(props) {
	// console.log('testing props');
	// console.log(props);
	const items = props.location.state;
	console.log(items);
	const [genericItem, setGenericItem] = useState({});
	const [item, setItem] = useState([]);
	// const productId = useRef();
	// const price = useRef();
	const qty = useRef();
	const size = useRef();

	// const findSizes = item => {
	// 	const foundProduct = items.filter(product => {
	// 		return product.name == item.name;
	// 	});
	// 	console.log(foundProduct);
	// 	for (let i = 0; i < foundProduct.length; i++) {
	// 		setSizes([...sizes, foundProduct[i].size]);
	// 	}
	// 	console.log('sizes array' + sizes);
	// };

	const findAllOfItem = item => {
		const foundProduct = items.filter(product => {
			return product.name == item.name;
		});
		setItem(foundProduct);
		console.log('found product' + typeof foundProduct);
	};

	let foundProductIdBySize = '';
	const findProductBySize = item => {
		const foundProduct = items.filter(product => {
			return product.name == item.name;
		});
		// console.log(foundProduct);
		for (let i = 0; i < foundProduct.length; i++) {
			if (size.current.value == foundProduct[i].size) {
				foundProductIdBySize = foundProduct[i]._id;
			}
		}
		// console.log('in the function' + foundProductIdBySize);
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/cantaloupe/${props.match.params.id}`
				);
				const data = await response.json();
				setGenericItem(data);
				findAllOfItem(data);
				// findSizes(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const addToCart = async e => {
		e.preventDefault();
		const totalPrice = genericItem.price * qty.current.value;
		findProductBySize(genericItem);
		// console.log('before try' + foundProductIdBySize);
		try {
			const response = await fetch('/api/cantaloupe/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					product: {
						id: foundProductIdBySize,
						price: genericItem.price,
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
			{Object.keys(genericItem).length ? (
				<>
					{console.log(item)}
					<div className="main-image">
						<img src={`${genericItem.image[0]}`} />
					</div>
					<div className="product-information">
						<p className="item-name">{genericItem.name}</p>
						{genericItem.sale ? (
							<p className="item-price">
								<span className="sale-price">${genericItem.salePrice}</span>{' '}
								<span className="original-price">${genericItem.price}</span>
							</p>
						) : (
							<p className="item-price">${genericItem.price}</p>
						)}
						<div>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star"></span> 4.0 | 5 Reviews
						</div>
						<br />
						<p className="item-color">
							Color: <span className="emphasize">{genericItem.color}</span>
						</p>
						<p>{genericItem.description}</p>
						<form onSubmit={addToCart}>
							<label>Size:</label>
							<div className="size-container">
								{item.map(item => {
									if (item.quantity) {
										return (
											<div className="size-button" id={item.size}>
												<input type="radio" id={item.size} value={item.size} />
												<label htmlFor={item.size}>{item.size}</label>
											</div>
										);
									} else {
										return (
											<div className="size-button" id={item.size}>
												<input
													type="radio"
													id={item.size}
													value={item.size}
													disabled
												/>
												<label htmlFor={item.size}>{item.size}</label>
											</div>
										);
									}
								})}
							</div>
							{/* <select id="size" ref={size}>
								<option value="XS">X-Small</option>
								<option value="S">Small</option>
								<option value="M">Medium</option>
								<option value="L">Large</option>
							</select> */}
							<br />
							<label>Quantity:</label>
							<select id="quantity" ref={qty}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select>
							<br />
							<p>Enjoy FREE RETURNS on all orders.</p>
							<input
								type="submit"
								className="addToCartButton"
								value={`Add to Basket $${genericItem.price}`}
							/>
							{/* Add Logic for Sale Item */}
						</form>
					</div>
				</>
			) : (
				''
			)}
		</div>
	);
}
