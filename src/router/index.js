import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const AppRouter = () => {
	return (
		<Router history={history}>
			<NavBar routes={routes} />
			<div className="middle-body">
				<Switch>
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							component={props => <Component page={key} {...props} />}
							history={history}
						></Route>
					))}
				</Switch>
			</div>
			<Footer />
		</Router>
	);
};

export default AppRouter;
