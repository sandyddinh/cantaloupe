import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Accessories(props) {
	const [items, setItems] = useState([]);
	const [filteredItemList, setFilteredItemList] = useState([]);

	const removeDuplicatesAndFilterByClothing = items => {
		const uniqueItems = Object.values(
			items.reduce((acc, obj) => {
				if (!acc[obj.name]) acc[obj.name] = obj;
				return acc;
			}, {})
		);
		const filteredItems = uniqueItems.filter(item => {
			return item.category == 'Accessories';
		});
		setFilteredItemList(filteredItems);
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cantaloupe');
				const data = await response.json();
				setItems(data);
				removeDuplicatesAndFilterByClothing(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="AccessoriesPage">
			{filteredItemList.map(item => {
				return (
					<div key={item._id}>
						<Link to={`/product/${item._id}`}>
							<img src={`${item.image[0]}`} />
						</Link>
						<h2 className="item-name">{item.name}</h2>
						<h4 className="item-price">{item.price}</h4>
					</div>
				);
			})}
		</div>
	);
}
