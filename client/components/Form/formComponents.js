import React from 'react';
import styled from 'styled-components';

export const Container = styled.div({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '80px'
});

export const SelectionContainer = styled.div({
	border: '1px solid #000',
	borderRadius: '0px 5px 5px 0px',
	height: '160px',
	width: '700px'
});

export const SelectionItemsContainer = styled.div({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-evenly',
	margin: '0 auto',
	marginTop: '20px'
});

export const SelectionItem = styled.div(({ selected }) => ({
	borderRadius: '5px',
	justifySelf: 'center',
	paddingTop: '15px',
	width: '10rem',
	...(selected
		? {
				borderBottom: '2.2px solid #000',
				borderRadius: '0px',
				marginBottom: '-5px',
				paddingBottom: '3px'
		  }
		: {})
}));
