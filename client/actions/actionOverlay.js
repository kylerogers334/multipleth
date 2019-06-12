import * as types from './actionTypes.js';

export const showOverlay = enlargedState => ({
	type: types.SHOW_OVERLAY,
	enlargedState
});

export const hideOverlay = () => ({
	type: types.HIDE_OVERLAY
});
