import {
    LOAD_US_STATES_DATA
} from '../actions/actionMap';

const initialState = {
    usStatesData: null
};

export default function(state=initialState, action) {
    switch (action.type) {
        case LOAD_US_STATES_DATA: 
            return Object.assign({}, state, {usStatesData: action.usStatesData});
        default: return state;
    }
}