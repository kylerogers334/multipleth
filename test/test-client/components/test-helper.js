import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ReactWrapper } from 'enzyme';
import reducer from '../../../client/reducers/reducer';

export function setupIntegrationTest() {
    const dispatchSpy = jest.fn(() => ({}));
    const reducerSpy = (state, action) => dispatchSpy(action);
    
    const emptyStore = applyMiddleware(thunk)(createStore);
    const combinedReducers = combineReducers({
        reducerSpy,
        reducer
    });
    
    const store = emptyStore(combinedReducers);
    
    return { store, dispatchSpy };
}