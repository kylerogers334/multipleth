/* global fetch */

export const LOAD_US_STATES_DATA = 'LOAD_US_STATES_DATA';
export const loadUsStatesData = usStatesData => ({
     usStatesData,
     type: LOAD_US_STATES_DATA
});

// async actions to add /api/whatever to state
// export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
// export const fetchCategoryRequest = () => ({
//   type: FETCH_CATEGORY_REQUEST
// });

export const FETCH_CATEGORY_STATE_SUCCESS = 'FETCH_CATEGORY_STATE_SUCCESS';
export const fetchCategoryStateSuccess = data =>({
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
//   dispatch(fetchCategoryRequest(category));
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
        // console.error(err);
        dispatch(fetchCategoryStateError(err));
    });
};

export const FETCH_CATEGORY_COUNTY_SUCCESS = 'FETCH_CATEGORY_COUNTY_SUCCESS';
export const fetchCategoryCountySuccess = data =>({
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
//   dispatch(fetchCategoryRequest(category));
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
        // console.error(err);
        dispatch(fetchCategoryCountyError(err));
    });
};