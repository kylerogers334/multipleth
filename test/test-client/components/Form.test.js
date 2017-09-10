/* global expect jest*/
import React from 'react';
import { shallow } from 'enzyme';

import { ColorPicker } from '../../../client/components/Form/ColorPicker';
import { Form } from '../../../client/components/Form/Form';

function ColorPickerSetup() {
    const props = {
        color: 'red',
        dispatch: jest.fn()
    };

    return shallow(<ColorPicker {...props} />);
}

describe('ColorPicker', () => {
    it('should render self', () => {
        const wrapper = ColorPickerSetup();
        expect(wrapper.find('#color-picker').length).toBe(1);
        expect(wrapper.find('.palette-item').length).toBe(6);
        expect(wrapper.find('.palette-selected .red').length).toBe(1);
    });
    
    it('should change .palette-selected', () => {
        const wrapper = ColorPickerSetup();
        wrapper.setProps({ color: 'green' });
        expect(wrapper.find('.palette-selected .red').length).toBe(0);
        expect(wrapper.find('.palette-selected .green').length).toBe(1);
    });
    
    it('should dispatch on click', () => {
        const wrapper = ColorPickerSetup();
        wrapper.find('.green').simulate('click');
        expect(wrapper.instance().props.dispatch).toHaveBeenCalled();
    });
});

function FormSetup() {
    return shallow(<Form dispatch={jest.fn()} />);
}

describe('Form', () => {
    it('should render self', () => {
        const wrapper = FormSetup();
        expect(wrapper.find('.form-container').length).toBe(1);
    });
    
    it('should highlight selected category, and not highlight any category on clear', () => {
        const wrapper = FormSetup();
        
        wrapper.find('a[children="Unemployment"]').simulate('click');
        expect(wrapper.state().cssSelection).toBe('unemployment');
        expect(wrapper.find('.selection-item .selected-outline').length).toBe(1);
        expect(wrapper.instance().props.dispatch).toHaveBeenCalled();
        
        wrapper.find('a[children="Clear Map"]').simulate('click');
        expect(wrapper.state().cssSelection).toBe('clear');
        expect(wrapper.find('.selection-item .selected-outline').length).toBe(0);
    });
    
    it('should toggle housing dropdown', () => {
        const wrapper = FormSetup();
        wrapper.find('DropdownItem[children="Total"]').simulate('click');
        expect(wrapper.state().cssSelection).toBe('population');
        expect(wrapper.instance().props.dispatch).toHaveBeenCalled();
    });
    
    it('should toggle population dropdown', () => {
        const wrapper = FormSetup();
        wrapper.find('DropdownItem[children="Purchase"]').simulate('click');
        expect(wrapper.state().cssSelection).toBe('housing');
        expect(wrapper.instance().props.dispatch).toHaveBeenCalled();
    });
});