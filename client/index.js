import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store.js';

// import Header from './components/Header.js';
import Map from './components/Map.js';

ReactDOM.render(
    <Provider store={store}>
        <Map />
    </Provider>,
    document.getElementById('root')
);
 
