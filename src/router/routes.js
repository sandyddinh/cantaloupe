import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Clothing from '../pages/Clothing';
import Activewear from '../pages/Activewear';
import Item from '../pages/Item';
import Accessories from '../pages/Accessories';
import Sale from '../pages/Sale';
import ShoppingCart from '../pages/ShoppingCart';
import Checkout from '../pages/Checkout';

const routes = [
	{
		Component: Clothing,
		key: 'Clothing',
		path: '/clothing'
	},
	{
		Component: Activewear,
		key: 'Activewear',
		path: '/activewear'
	},
	{
		Component: Accessories,
		key: 'Accessories',
		path: '/accessories'
	},
	{
		Component: Sale,
		key: 'Sale',
		path: '/sale'
	},
	{
		Component: ShoppingCart,
		key: 'ShoppingCart',
		path: '/cart'
	},
	{
		Component: Checkout,
		key: 'Checkout',
		path: '/checkout'
	},
	// {
	// 	Component: About,
	// 	key: 'About',
	// 	path: '/about'
	// },
	{
		Component: Item,
		key: 'Item',
		path: '/product/:id'
	},
	{
		Component: App,
		key: 'App',
		path: '/'
	}
];

export default routes;
