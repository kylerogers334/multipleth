export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const showOverlay = enlargedState => ({
    enlargedState,
    type: SHOW_OVERLAY
});

export const HIDE_OVERLAY = 'HIDE_OVERLAY';
export const hideOverlay = () => ({
    type: HIDE_OVERLAY
});
