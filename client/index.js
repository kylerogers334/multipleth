import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store.js';

ReactDOM.render(
    <Provider store={store}>
        <p>hello world</p>
    </Provider>,
    document.getElementById('root')
);
 
