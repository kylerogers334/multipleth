import {
    LOAD_US_STATES_DATA
} from '../actions/actionMap';
import {
    SHOW_OVERLAY, 
    HIDE_OVERLAY
} from '../actions/actionOverlay';
import {
    SET_FORM_SELECT,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_ERROR
} from '../actions/actionForm';

const initialState = {
    usStatesData: null,
    displayOverlay: false,
    enlargedState: null,
    formSelection: null,
    categoryData: null,
};

export default function(state=initialState, action) {
    console.log('Action dispatched:', action.type);
    switch (action.type) {
        case LOAD_US_STATES_DATA: 
            return Object.assign({}, state, {usStatesData: action.usStatesData});
        case SHOW_OVERLAY:
            return Object.assign({}, state, {displayOverlay: true}, 
                            {enlargedState: action.enlargedState});
        case HIDE_OVERLAY: 
            return Object.assign({}, state, {displayOverlay: false});
        case SET_FORM_SELECT:
            return Object.assign({}, state, {formSelection: action.selection});
        case FETCH_CATEGORY_SUCCESS:
            return Object.assign({}, state, {categoryData: action.data});
        case FETCH_CATEGORY_ERROR:{
            console.error(action.error); return;
        }
        default: return state;
    }
}