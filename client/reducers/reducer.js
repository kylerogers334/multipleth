import {
    LOAD_US_STATES_DATA
} from '../actions/actionMap';
import {
    SHOW_OVERLAY, 
    HIDE_OVERLAY
} from '../actions/actionOverlay';

const initialState = {
    usStatesData: null,
    displayOverlay: false,
    enlargedState: null,
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
        default: return state;
    }
}