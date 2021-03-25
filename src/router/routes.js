import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Clothing from '../pages/Clothing';
import Activewear from '../pages/Activewear';
import Item from '../pages/Item';

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
		Component: Home,
		key: 'Home',
		path: '/home'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: Item,
		key: 'Item',
		path: '/:id'
	},
	{
		Component: App,
		key: 'App',
		path: '/'
	}
];

export default routes;
