/* global fetch */
import * as types from './actionTypes.js';

export const loadUsStatesData = usStatesData => ({
    usStatesData,
    type: types.LOAD_US_STATES_DATA
});

export const clearMap = () => ({
    type: types.CLEAR_MAP
});

export const fetchCategoryStateSuccess = (data, category) => ({
    type: types.FETCH_CATEGORY_STATE_SUCCESS,
    data,
    category
});

export const fetchCategoryStateError = error => ({
    type: types.FETCH_CATEGORY_STATE_ERROR,
    error
});

export const fetchCategoryState = category => dispatch => {
    return fetch(`/api/${category}/state`)
    .then(response => {
        if (!response.ok) Promise.reject(response.statusText);
        return response.json();
    })
    .then(data => {
        return dispatch(fetchCategoryStateSuccess(data, category));
    })
    .catch(err => {
        dispatch(fetchCategoryStateError(err));
    });
};

export const fetchCategoryCountySuccess = (data, category) => ({
    type: types.FETCH_CATEGORY_COUNTY_SUCCESS,
    data,
    category
});

export const fetchCategoryCountyError = error => ({
    type: types.FETCH_CATEGORY_COUNTY_ERROR,
    error
});

export const fetchCategoryCounty = (category, selectedState) => dispatch => {
    return fetch(`/api/${category}/county/${selectedState}`)
    .then(response => {
        if (!response.ok) Promise.reject(response.statusText);
        return response.json();
    })
    .then(data => {
        return dispatch(fetchCategoryCountySuccess(data, category));
    })
    .catch(err => {
        dispatch(fetchCategoryCountyError(err));
    });
};