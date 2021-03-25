import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [item, setItem] = useState({});

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

	return (
		<div className="ItemPage">
			{Object.keys(item).length ? (
				<div>
					{console.log(item)}
					{console.log(item.image)}
					<img src={`${item.image[0]}`} />
					<h3>{item.name}</h3>
					<h3>${item.price}</h3>
					<h3>description</h3>
					<h3>size</h3>
					<h3>quantity</h3>
					<button>Add to Cart ${item.price}</button>
                    {/* Add Logic for Sale Item */}
				</div>
			) : (
				''
			)}
		</div>
	);
}
