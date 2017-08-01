/* global fetch */
// import fetch from 'isomorphic-fetch';

export const SET_FORM_SELECT = 'SET_FORM_SELECT';
export const setFormSelect = selection => ({
    type: SET_FORM_SELECT,
    selection
});

// async actions to add /api/whatever to state
// export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
// export const fetchCategoryRequest = () => ({
//   type: FETCH_CATEGORY_REQUEST
// });

export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const fetchCategorySuccess = data =>({
  type: FETCH_CATEGORY_SUCCESS,
  data
});

export const FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR';
export const fetchCategoryError = error => ({
  type: FETCH_CATEGORY_ERROR,
  error
});

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const fetchCategory = category => dispatch => {
//   dispatch(fetchCategoryRequest(category));
    return fetch(`/api/${category}`)
    .then(response => {
        if (!response.ok) Promise.reject(response.statusText);
        return response.json();
    })
    .then(data => {
        data.category = category;
        return dispatch(fetchCategorySuccess(data));
    })
    .catch(err => {
        // console.error(err);
        dispatch(fetchCategoryError(err));
    });
};