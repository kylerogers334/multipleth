import * as types from './actionTypes.js';

export const showModal = modalType => ({
	modalType,
	type: types.SHOW_MODAL
});

export const hideModal = () => ({
	type: types.HIDE_MODAL
});
