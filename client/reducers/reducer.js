import {
    LOAD_US_STATES_DATA,
    CLEAR_MAP,
    FETCH_CATEGORY_STATE_SUCCESS,
    FETCH_CATEGORY_STATE_ERROR,
    FETCH_CATEGORY_COUNTY_SUCCESS,
    FETCH_CATEGORY_COUNTY_ERROR,
} from '../actions/actionHandleData.js';

import {
    SHOW_OVERLAY, 
    HIDE_OVERLAY
} from '../actions/actionOverlay.js';

const initialState = {
    usStatesLineData: null,
    displayOverlay: false,
    enlargedState: null,
    categoryStateData: null,
    categoryCountyData: null,
    categoryName: null,
};

export default function(state=initialState, action) {
    switch (action.type) {
        case LOAD_US_STATES_DATA: 
            return Object.assign({}, state, {usStatesLineData: action.usStatesLineData});
        case SHOW_OVERLAY:
            return Object.assign({}, state, {displayOverlay: true}, 
                            {enlargedState: action.enlargedState});
        case HIDE_OVERLAY: 
            return Object.assign({}, state, {displayOverlay: false});
        case CLEAR_MAP: 
            return Object.assign({}, state, {
                categoryStateData: null,
                categoryCountyData: null,
                categoryName: null,
            });
        case FETCH_CATEGORY_STATE_SUCCESS:
            return Object.assign({}, state, {
                categoryStateData: action.data,
                categoryName: action.data.category
            });
        case FETCH_CATEGORY_STATE_ERROR:{
            console.error(action.error); return state;
        }
        case FETCH_CATEGORY_COUNTY_SUCCESS:
            return Object.assign({}, state, {
                categoryCountyData: action.data,
                categoryName: action.data.category
            });
        case FETCH_CATEGORY_COUNTY_ERROR:{
            console.error(action.error); return state;
        }
        default: return state;
    }
}