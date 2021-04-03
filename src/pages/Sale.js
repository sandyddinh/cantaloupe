import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Sale(props) {
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
			return item.sale == true;
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
		<>
			<SideBar />
			<div className="SalePage">
				<div className="products-display">
					{filteredItemList.map(item => {
						return (
							<div key={item._id} className="product-container">
								<Link to={{ pathname: `/product/${item._id}`, state: items }}>
									<div className="product-image">
										<img
											className="product-image-main"
											src={`${item.image[0]}`}
										/>
										<img
											className="product-image-hover"
											src={`${item.image[1]}`}
										/>
									</div>
								</Link>
								<h2 className="item-name">{item.name}</h2>
								{item.sale ? (
									<h4 className="item-price">
										<span className="sale-price">${item.salePrice}</span>{' '}
										<span className="original-price">${item.price}</span>
									</h4>
								) : (
									<h4 className="item-price">${item.price}</h4>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
