import React, { useState, useEffect, useRef } from 'react';

export default function Item(props) {
	// console.log('testing props');
	// console.log(props);
	const items = props.location.state;
	// console.log(items);
	const [genericItem, setGenericItem] = useState({});
	const [item, setItem] = useState([]);
	const [quantity, setQuantity] = useState(0);
	// const productId = useRef();
	// const price = useRef();
	// const qty = useRef();
	const size = useRef();

	const increment = () => {
		setQuantity(quantity + 1);
	};

	const decrement = () => {
		if (quantity != 0) {
			setQuantity(quantity - 1);
		}
	};

	const findAllOfItem = item => {
		const foundProduct = items.filter(product => {
			return product.name == item.name;
		});
		setItem(foundProduct);
		// console.log('found product' + typeof foundProduct);
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
		const totalPrice = genericItem.price * quantity;
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
						qty: quantity
					},
					totalPrice: totalPrice,
					totalQty: quantity
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
					<div className="image-previews">
						{genericItem.image.map(img => {
							// for (let i = 0; i < genericItem.image.length; i++){
							return (
								<div className="image-small">
									<img src={img} />
								</div>
							);
							// }
						})}
					</div>
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
											<div className="size-button" key={item.size}>
												<input
													type="radio"
													id={item.size}
													value={item.size}
													name="size"
													className="radio-button"
												/>
												<label htmlFor={item.size}>{item.size}</label>
											</div>
										);
									} else {
										return (
											<div className="size-button" key={item.size}>
												<input
													type="radio"
													id={item.size}
													value={item.size}
													name="size"
													disabled
												/>
												<label htmlFor={item.size}>{item.size}</label>
											</div>
										);
									}
								})}
							</div>
							<label>Quantity:</label>
							<div className="quantity-container">
								<button onClick={decrement} className="quantity-button">
									-
								</button>
								<input type="text" placeholder={quantity} />
								<button onClick={increment} className="quantity-button">
									+
								</button>
							</div>
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
