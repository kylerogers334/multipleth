/* global expect jest*/
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { setupIntegrationTest } from './test-helper.js';

import AboutButton from '../../../client/components/InfoModal/AboutButton';
import AboutModal from '../../../client/components/InfoModal/AboutModal';
import HelpButton from '../../../client/components/InfoModal/HelpButton';
import HelpModal from '../../../client/components/InfoModal/HelpModal';

describe('AboutButton', () => {
    let store;
    let dispatchSpy;
    let wrapper;
    
    beforeEach(() => {
        ({ store, dispatchSpy } = setupIntegrationTest());
        
        wrapper = mount(
            <Provider store={store}>
                <AboutButton />
            </Provider>
        );
    });
    
    it('should render self', () => {
        expect(wrapper.find('.about .info-btn').length).toBe(1);
    });
    
    it('should display AboutModal when clicked', () => {
        wrapper.find('.about .info-btn').simulate('click');
        expect(dispatchSpy).toBeCalledWith({ type: 'SHOW_ABOUT_MODAL' });
        expect(store.getState().reducer.showInfoModal).toBe('about');
    });
});

describe('AboutModal', () => {
    let store;
    let dispatchSpy;
    let wrapper;
    
    beforeEach(() => {
        ({ store, dispatchSpy } = setupIntegrationTest());
        
        wrapper = mount(
            <Provider store={store}>
                <AboutModal />
            </Provider>
        );
    });
    
    it('should render self', () => {
        expect(wrapper.find('.modal-title[children="About"]').length).toBe(1);
    });
    
    it('should hide when close button pressed', () => {
        wrapper.find('.close-button > a').simulate('click');
        expect(dispatchSpy).toBeCalledWith({ type: 'HIDE_MODAL' });
        expect(store.getState().reducer.showInfoModal).toBe(false);
    });
});

describe('HelpButton', () => {
    let store;
    let dispatchSpy;
    let wrapper;
    
    beforeEach(() => {
        ({ store, dispatchSpy } = setupIntegrationTest());
        
        wrapper = mount(
            <Provider store={store}>
                <HelpButton />
            </Provider>
        );
    });
    
    it('should render self', () => {
        expect(wrapper.find('.help .info-btn').length).toBe(1);
    });
    
    it('should display HelpModal when clicked', () => {
        wrapper.find('.help .info-btn').simulate('click');
        expect(dispatchSpy).toBeCalledWith({ type: 'SHOW_HELP_MODAL' });
        expect(store.getState().reducer.showInfoModal).toBe('help');
    });
});

describe('HelpModal', () => {
    let store;
    let dispatchSpy;
    let wrapper;
    
    beforeEach(() => {
        ({ store, dispatchSpy } = setupIntegrationTest());
        
        wrapper = mount(
            <Provider store={store}>
                <HelpModal />
            </Provider>
        );
    });
    
    it('should render self', () => {
        expect(wrapper.find('.modal-title[children="Help"]').length).toBe(1);
    });
    
    it('should hide when close button pressed', () => {
        wrapper.find('.close-button > a').simulate('click');
        expect(dispatchSpy).toBeCalledWith({ type: 'HIDE_MODAL' });
        expect(store.getState().reducer.showInfoModal).toBe(false);
    });
});
