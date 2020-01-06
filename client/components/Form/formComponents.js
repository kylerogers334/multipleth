import React from 'react';
import styled from 'styled-components';

export const Container = styled.div({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '80px'
});

export const SelectionContainer = styled.div({
	border: '1px solid #000000',
	width: '700px'
});

export const SelectionItemsContainer = styled.div({
	display: 'grid',
	gridTemplateColumns: '233.3px 233.3px 233.3px',
	gridTemplateRows: '66px 66px 66px',
	position: 'relative'
});

export const SelectionItem = styled.div(({ selected }) => ({
	alignItems: 'center',
	backgroundColor: selected ? '#000000' : '#FFFFFF',
	display: 'flex',
	justifyContent: 'center',
	marginTop: selected ? '0px' : '1px',
	width: '233.3px',
	'& > a': {
		color: selected ? '#FFFFFF' : '#000000',
		cursor: 'pointer'
	}
}));
