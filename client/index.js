import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';

const rootEl = document.getElementById('root');

const AppWithStore = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(<AppWithStore />, rootEl);

if (module.hot) {
	module.hot.accept('./components/App', () => {
		const NextApp = require('./components/App').default;
		ReactDOM.render(
			<Provider store={store}>
				<NextApp />
			</Provider>,
			rootEl
		);
	});
}
