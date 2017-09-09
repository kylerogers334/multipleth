/* global expect beforeAll*/
import reducer from '../../client/reducers/reducer';
import * as types from '../../client/actions/actionTypes';

describe('the only reducer', () => {
    const initialState = {
                usStatesLineData: null,
                color: 'blue',
                displayOverlay: false,
                enlargedState: null,
                categoryStateData: null,
                categoryCountyData: null,
                categoryName: null,
                showInfoModal: false
            };
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    
    it('should handle adding US line data', () => {
        const data  = {
            type: types.LOAD_US_STATES_DATA,
            usStatesLineData: {}
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, { usStatesLineData: {} }));
    });
    
    it('should handle changing map color', () => {
        const data  = {
            type: types.CHANGE_COLOR,
            color: 'red'
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, { color: 'red' }));
    });
    
    it('should handle showing and hiding overlay', () => {
        let data  = {
            type: types.SHOW_OVERLAY,
            enlargedState: 'California'
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, { 
            displayOverlay: true,
            enlargedState: 'California'
        }));
        
        data  = {
            type: types.HIDE_OVERLAY
        };
        const overlayActive = Object.assign({}, initialState, { 
            displayOverlay: true,
            enlargedState: 'California'
        });
        
        expect(reducer(overlayActive, data))
        .toEqual(Object.assign({}, initialState, { 
            displayOverlay: false, 
            enlargedState: null
        }));
    });
    
    it('should handle toggling aboutModal', () => {
        let data  = {
            type: types.SHOW_ABOUT_MODAL
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, { showInfoModal: 'about' }));
        
        data = {
            type: types.HIDE_MODAL
        };
        const aboutModalActive = Object.assign({}, initialState, { showInfoModal: 'about' });
        
        expect(reducer(aboutModalActive, data))
        .toEqual(Object.assign({}, initialState, { showInfoModal: false }));
    });
    
    it('should handle toggling helpModal', () => {
        let data  = {
            type: types.SHOW_HELP_MODAL
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, { showInfoModal: 'help' }));
        
        data = {
            type: types.HIDE_MODAL
        };
        const helpModalActive = Object.assign({}, initialState, { showInfoModal: 'help' });
        
        expect(reducer(helpModalActive, data))
        .toEqual(Object.assign({}, initialState, { showInfoModal: false }));
    });
    
    it('should handle adding US state data', () => {
        const data = {
            type: types.FETCH_CATEGORY_STATE_SUCCESS,
            data: {},
            category: 'income'
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, {
            categoryStateData: {},
            categoryName: 'income'
        }));
    });
    
    it('should handle adding US county data', () => {
        const data = {
            type: types.FETCH_CATEGORY_COUNTY_SUCCESS,
            data: {},
            category: 'income'
        };
        
        expect(reducer(initialState, data))
        .toEqual(Object.assign({}, initialState, {
            categoryCountyData: {},
            categoryName: 'income'
        }));
    });
    
    it('should handle clearing the map', () => {
        const mapActiveState = Object.assign({}, initialState, {
            categoryStateData: {},
            categoryCountyData: {},
            categoryName: 'income'
        });
        const data = {
            type: types.CLEAR_MAP
        };
        
        expect(reducer(mapActiveState, data))
        .toEqual(Object.assign({}, mapActiveState, {
            categoryStateData: null,
            categoryCountyData: null,
            categoryName: null
        }));
    });
});
