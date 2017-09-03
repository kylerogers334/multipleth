/* global fetch */

export const LOAD_US_STATES_DATA = 'LOAD_US_STATES_DATA';
export const loadUsStatesData = usStatesData => ({
    usStatesData,
    type: LOAD_US_STATES_DATA
});

export const CLEAR_MAP = 'CLEAR_MAP';
export const clearMap = () => ({
    type: CLEAR_MAP
});

export const FETCH_CATEGORY_STATE_SUCCESS = 'FETCH_CATEGORY_STATE_SUCCESS';
export const fetchCategoryStateSuccess = data => ({
    type: FETCH_CATEGORY_STATE_SUCCESS,
    data
});

export const FETCH_CATEGORY_STATE_ERROR = 'FETCH_CATEGORY_STATE_ERROR';
export const fetchCategoryStateError = error => ({
    type: FETCH_CATEGORY_STATE_ERROR,
    error
});

export const FETCH_CATEGORY_STATE = 'FETCH_CATEGORY_STATE';
export const fetchCategoryState = category => dispatch => {
    return fetch(`/api/${category}/state`)
    .then(response => {
        if (!response.ok) Promise.reject(response.statusText);
        return response.json();
    })
    .then(data => {
        data.category = category;
        return dispatch(fetchCategoryStateSuccess(data));
    })
    .catch(err => {
        dispatch(fetchCategoryStateError(err));
    });
};

export const FETCH_CATEGORY_COUNTY_SUCCESS = 'FETCH_CATEGORY_COUNTY_SUCCESS';
export const fetchCategoryCountySuccess = data => ({
    type: FETCH_CATEGORY_COUNTY_SUCCESS,
    data
});

export const FETCH_CATEGORY_COUNTY_ERROR = 'FETCH_CATEGORY_COUNTY_ERROR';
export const fetchCategoryCountyError = error => ({
    type: FETCH_CATEGORY_COUNTY_ERROR,
    error
});

export const FETCH_CATEGORY_COUNTY = 'FETCH_CATEGORY_COUNTY';
export const fetchCategoryCounty = (category, selectedState) => dispatch => {
    return fetch(`/api/${category}/county/${selectedState}`)
    .then(response => {
        if (!response.ok) Promise.reject(response.statusText);
        return response.json();
    })
    .then(data => {
        data.category = category;
        return dispatch(fetchCategoryCountySuccess(data));
    })
    .catch(err => {
        dispatch(fetchCategoryCountyError(err));
    });
};