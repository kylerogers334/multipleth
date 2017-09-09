/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as handleDataActions from '../../client/actions/actionHandleData';
import * as infoModalActions from '../../client/actions/actionInfoModal';
import * as mapActions from '../../client/actions/actionMap';
import * as overlayActions from '../../client/actions/actionOverlay';
import * as types from '../../client/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sync actions', () => {
    it('should change the map color', () => {
        const color = 'grey';
        const expectedAction = {
            type: types.CHANGE_COLOR,
            color
        };
        expect(mapActions.changeColor(color)).toEqual(expectedAction);
    });
    
    it('should show about modal', () => {
        const expectedAction = {
            type: types.SHOW_ABOUT_MODAL
        };
        expect(infoModalActions.showAboutModal()).toEqual(expectedAction);
    });
    
    it('should show help modal', () => {
        const expectedAction = {
            type: types.SHOW_HELP_MODAL
        };
        expect(infoModalActions.showHelpModal()).toEqual(expectedAction);
    });
    
    it('should hide modal', () => {
        const expectedAction = {
            type: types.HIDE_MODAL
        };
        expect(infoModalActions.hideModal()).toEqual(expectedAction);
    });
    
    it('should show overlay', () => {
        const enlargedState = 'Texas';
        const expectedAction = {
            type: types.SHOW_OVERLAY,
            enlargedState
        };
        expect(overlayActions.showOverlay(enlargedState)).toEqual(expectedAction);
    });
    
    it('should hide overlay', () => {
        const expectedAction = {
            type: types.HIDE_OVERLAY
        };
        expect(overlayActions.hideOverlay()).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    afterEach(() => fetchMock.reset());
    
    it('creates FETCH_CATEGORY_STATE_SUCCESS when fetching state data has succeeded', () => {
        fetchMock.getOnce('/api/age/state', {});
        
        const expectedActions = [
            { 
                type: types.FETCH_CATEGORY_STATE_SUCCESS, 
                data: {}, 
                category: 'age'
            }
        ];
        const store = mockStore({ categoryStateData: null });
        
        return store.dispatch(handleDataActions.fetchCategoryState('age')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    
    it('creates FETCH_CATEGORY_STATE_ERROR when fetching state data has failed', () => {
        fetchMock.mock('/api/INVALID/state', 503);
        
        const expectedActions = [
        { type: types.FETCH_CATEGORY_STATE_ERROR, error: 
            new Error('invalid json response body at /api/INVALID/state reason: ' + 
            'Unexpected end of JSON input') }
        ];
        const store = mockStore({ categoryStateData: null });
        
        return store.dispatch(handleDataActions.fetchCategoryState('INVALID')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    
    it('creates FETCH_CATEGORY_STATE_SUCCESS when fetching state data has succeeded', () => {
        fetchMock.getOnce('/api/age/county/01', {});
        
        const expectedActions = [
            { 
                type: types.FETCH_CATEGORY_COUNTY_SUCCESS, 
                data: {},
                category: 'age' 
            }
        ];
        const store = mockStore({ categoryCountyData: null });
        
        return store.dispatch(handleDataActions.fetchCategoryCounty('age', '01')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    
    it('creates FETCH_CATEGORY_COUNTY_ERROR when fetching state data has failed', () => {
        fetchMock.mock('/api/INVALID/county/01', 503);
        
        const expectedActions = [
        { type: types.FETCH_CATEGORY_COUNTY_ERROR, error: 
            new Error('invalid json response body at /api/INVALID/county/01 reason: ' + 
            'Unexpected end of JSON input') }
        ];
        const store = mockStore({ categoryCountyData: null });
        
        return store.dispatch(handleDataActions.fetchCategoryCounty('INVALID', '01')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
