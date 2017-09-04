import * as types from './actionTypes.js';

export const showAboutModal = () => ({
    type: types.SHOW_ABOUT_MODAL
});

export const showHelpModal = () => ({
    type: types.SHOW_HELP_MODAL
});

export const hideModal = () => ({
    type: types.HIDE_MODAL
});