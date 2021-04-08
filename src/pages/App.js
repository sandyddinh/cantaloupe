import React from 'react';

export default function App(props) {
	return (
		<div className="AppPage">
			<div className="top-section">
				<a href="/clothing">
					<img src="https://res.cloudinary.com/dxuoqqfve/image/upload/v1617661481/cantaloupe/spring-collection_pz7qdd.jpg" />
				</a>
			</div>
			<div className="bottom-section">
				<div className="bottom-left-section">
					<a href="/activewear">
						<img src="https://res.cloudinary.com/dxuoqqfve/image/upload/v1617661481/cantaloupe/new-to-activewear_maex8z.jpg" />
					</a>
				</div>
				<div className="bottom-right-section">
					<a href="/sale">
						<img src="https://res.cloudinary.com/dxuoqqfve/image/upload/v1617661481/cantaloupe/winter-sale_wu0yaa.jpg" />
					</a>
				</div>
			</div>
		</div>
	);
}
