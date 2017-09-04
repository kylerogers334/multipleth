/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as handleDataActions from '../../client/actions/actionHandleData';
import * as infoModalActions from '../../client/actions/actionInfoModal';
import * as mapActions from '../../client/actions/actionMap';
import * as overlayActions from '../../client/actions/actionOverlay';
import * as types from '../../client/actions/actionTypes';
// import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sync actions', () => {
    it('should change the map color', () => {
        const color = 'grey';
        const expectedAction = {
            type: types.CHANGE_COLOR,
            color
        };
        expect(mapActions.changeColor(color)).toEqual(expectedAction);
    });
    
    it('should show about modal', () => {
        const expectedAction = {
            type: types.SHOW_ABOUT_MODAL
        };
        expect(infoModalActions.showAboutModal()).toEqual(expectedAction);
    });
    
    it('should show help modal', () => {
        const expectedAction = {
            type: types.SHOW_HELP_MODAL
        };
        expect(infoModalActions.showHelpModal()).toEqual(expectedAction);
    });
    
    it('should hide modal', () => {
        const expectedAction = {
            type: types.HIDE_MODAL
        };
        expect(infoModalActions.hideModal()).toEqual(expectedAction);
    });
    
    it('should show overlay', () => {
        const enlargedState = 'Texas';
        const expectedAction = {
            type: types.SHOW_OVERLAY,
            enlargedState
        };
        expect(overlayActions.showOverlay(enlargedState)).toEqual(expectedAction);
    });
    
    it('should hide overlay', () => {
        const expectedAction = {
            type: types.HIDE_OVERLAY
        };
        expect(overlayActions.hideOverlay()).toEqual(expectedAction);
    });
});

// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll()
//   })

//   it('creates FETCH_CATEGORY_STATE_SUCCESS when fetching state has been done', () => {
//     nock('/api/age/state')
//       .get('/todos')
//       .reply(200, { body: { todos: ['do something'] } })

//     const expectedActions = [
//       { type: types.FETCH_TODOS_REQUEST },
//       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
//     ]
//     const store = mockStore({ todos: [] })

//     return store.dispatch(actions.fetchTodos()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })