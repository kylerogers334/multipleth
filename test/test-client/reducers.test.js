/* global expect beforeAll*/
import reducer from '../../client/reducers/reducer';
import * as types from '../../client/actions/actionTypes';

describe('the only reducer', () => {
	const initialState = {
		usStatesLineData: null,
		color: 'blue',
		displayOverlay: false,
		enlargedState: null,
		categoryStateData: null,
		categoryCountyData: null,
		categoryName: null,
		showInfoModal: false
	};

	it('should return the initial state', () => {
		expect(reducer(null, {})).toEqual(initialState);
	});

	it('should handle adding US line data', () => {
		const data = {
			type: types.LOAD_US_STATES_DATA,
			usStatesLineData: {}
		};

		expect(reducer(initialState, data)).toEqual({
			...initialState,
			usStatesLineData: {}
		});
	});

	it('should handle changing map color', () => {
		const data = {
			type: types.CHANGE_COLOR,
			color: 'red'
		};

		expect(reducer(initialState, data)).toEqual({
			...initialState,
			color: 'red'
		});
	});

	it('should handle showing and hiding overlay', () => {
		const showOverlayData = {
			type: types.SHOW_OVERLAY,
			enlargedState: 'California'
		};

		expect(reducer(initialState, showOverlayData)).toEqual({
			...initialState,
			displayOverlay: true,
			enlargedState: 'California'
		});

		const hideOverlayData = {
			type: types.HIDE_OVERLAY
		};

		const overlayActive = {
			...initialState,
			displayOverlay: true,
			enlargedState: 'California'
		};

		expect(reducer(overlayActive, hideOverlayData)).toEqual({
			...initialState,
			displayOverlay: false,
			enlargedState: null
		});
	});

	it('should handle toggling aboutModal', () => {
		const showAboutModalData = {
			type: types.SHOW_ABOUT_MODAL
		};

		expect(reducer(initialState, showAboutModalData)).toEqual({
			...initialState,
			showInfoModal: 'about'
		});

		const hideModalData = {
			type: types.HIDE_MODAL
		};

		const aboutModalActive = { ...initialState, showInfoModal: 'about' };

		expect(reducer(aboutModalActive, showAboutModalData)).toEqual({
			...initialState,
			showInfoModal: false
		});
	});

	it('should handle toggling helpModal', () => {
		const showModalData = {
			type: types.SHOW_HELP_MODAL
		};

		expect(reducer(initialState, showModalData)).toEqual({
			...initialState,
			showInfoModal: 'help'
		});

		const hideModalData = {
			type: types.HIDE_MODAL
		};

		const helpModalActive = { ...initialState, showInfoModal: 'help' };

		expect(reducer(helpModalActive, hideModalData)).toEqual({
			...initialState,
			showInfoModal: false
		});
	});

	it('should handle adding US state data', () => {
		const data = {
			type: types.FETCH_CATEGORY_STATE_SUCCESS,
			data: {},
			category: 'income'
		};

		expect(reducer(initialState, data)).toEqual({
			...initialState,
			categoryStateData: {},
			categoryName: 'income'
		});
	});

	it('should handle adding US county data', () => {
		const data = {
			type: types.FETCH_CATEGORY_COUNTY_SUCCESS,
			data: {},
			category: 'income'
		};

		expect(reducer(initialState, data)).toEqual({
			...initialState,
			categoryCountyData: {},
			categoryName: 'income'
		});
	});

	it('should handle clearing the map', () => {
		const data = {
			type: types.CLEAR_MAP
		};

		expect(reducer(mapActiveState, data)).toEqual({
			...initialState,
			categoryStateData: {},
			categoryCountyData: {},
			categoryName: 'income',
			categoryStateData: null,
			categoryCountyData: null,
			categoryName: null
		});
	});
});
