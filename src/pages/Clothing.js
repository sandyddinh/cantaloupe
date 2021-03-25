import React, { useEffect, useState } from 'react';

export default function Contact(props) {
	const [items, setItems] = useState([]);
	const [uniqueItems, setUniqueItems] = useState([]);

	const filterItems = items => {
		const output = Object.values(
			items.reduce((acc, obj) => {
				if (!acc[obj.name]) acc[obj.name] = obj;
				return acc;
			}, {})
		);
		setUniqueItems(output);
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cantaloupe');
				const data = await response.json();
				setItems(data);
				filterItems(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="ClothingPage">
			{uniqueItems.map(item => {
				return (
					<div key={item._id}>
						<img src={`${item.image[0]}`} />
						<h2 className="item-name">{item.name}</h2>
						<h4 className="item-price">{item.price}</h4>
					</div>
				);
			})}
		</div>
	);
}
