import React, { useState, useEffect } from 'react';

export default function Item(props) {
	const items = props.location.state;
	const [genericItem, setGenericItem] = useState({});
	const [item, setItem] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const [mainImage, setMainImage] = useState();
	const [size, setSize] = useState('');
	const [purchasePrice, setPurchasePrice] = useState();
	const [cartNotification, setCartNotification] = useState(false);

	const increment = () => {
		setQuantity(quantity + 1);
	};

	const decrement = () => {
		if (quantity != 0) {
			setQuantity(quantity - 1);
		}
	};

	const findPurchasePrice = item => {
		if (item.sale) {
			setPurchasePrice(item.salePrice);
		} else {
			setPurchasePrice(item.price);
		}
	};

	const findAllOfItem = item => {
		const foundProduct = items.filter(product => {
			return product.name == item.name;
		});
		setItem(foundProduct);
	};

	let foundProductIdBySize = '';
	const findProductBySize = item => {
		const foundProduct = items.filter(product => {
			return product.name == item.name;
		});
		for (let i = 0; i < foundProduct.length; i++) {
			if (size == foundProduct[i].size) {
				foundProductIdBySize = foundProduct[i]._id;
			}
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/cantaloupe/${props.match.params.id}`
				);
				const data = await response.json();
				setGenericItem(data);
				setMainImage(data.image[0]);
				findAllOfItem(data);
				findPurchasePrice(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const addToCart = async e => {
		e.preventDefault();
		await findProductBySize(genericItem);
		console.log(
			'purchasing size: ' + size + ' and product id: ' + foundProductIdBySize
		);
		try {
			const response = await fetch('/api/cantaloupe/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					product: {
						id: foundProductIdBySize,
						name: genericItem.name,
						price: purchasePrice,
						qty: quantity,
						image: genericItem.image[0],
						color: genericItem.color,
						size: size
					}
				})
			});
			setCartNotification(true);
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
							return (
								<div className="image-small" onClick={() => setMainImage(img)}>
									<img src={img} />
								</div>
							);
						})}
					</div>
					<div className="main-image">
						<img src={mainImage} />
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
						<label>Size:</label>
						<div className="size-container">
							{item.map(item => {
								if (item.quantity > 0) {
									return (
										<div
											className="size-button"
											key={item.size}
											onClick={() => setSize(item.size)}
										>
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
												className="radio-button"
												disabled
											/>
											<label htmlFor={item.size} className="out-of-stock">
												{item.size}
											</label>
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
						<button
							type="submit"
							className="addToCartButton"
							onClick={addToCart}
						>
							Add to Basket ${genericItem.price}
						</button>
						{cartNotification ? (
							<p className="ok-message">Added to cart!</p>
						) : (
							''
						)}
					</div>
				</>
			) : (
				''
			)}
		</div>
	);
}
