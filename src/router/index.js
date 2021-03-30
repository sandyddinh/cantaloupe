import React from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';

const AppRouter = () => {
	return (
		<Router>
			<NavBar routes={routes} />
			<div className="middle-body">
				<SideBar />
				<Switch>
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							component={props => <Component page={key} {...props} />}
						></Route>
					))}
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
