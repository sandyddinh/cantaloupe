import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import 'bootstrap/scss/bootstrap.scss';

// const App = () => {
// 	return (
// 		<StripeProvider apiKey="pk_test_51IZiVpCZzgAQXehgNyiD7QAjXdkj3tKCkXWGvW2p483FNIKp0iFIJGXgo6dqXsGYuCRDfrJWvK0nXzgmHSMSlL5B00mWENHgJi">
// 			<Checkout />
// 			<AppRouter />
// 		</StripeProvider>
// 	);
// };

// render(<App />, document.getElementById('app'));

const app = document.getElementById('app');

ReactDOM.render(<AppRouter />, app);
