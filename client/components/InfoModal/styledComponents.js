import React from 'react';
import styled from 'styled-components';

export const Container = styled.div({
	background: 'rgba(86, 86, 86, 0.3)',
	color: '#FFF',
	height: '100%',
	left: 0,
	margin: 0,
	position: 'absolute',
	top: 0,
	width: '100%',
	zIndex: 1000
});

export const Content = styled.div({
	background: 'rgba(255, 255, 255, 1)',
	border: '3px solid rgb(0, 0, 0)',
	borderRadius: '3px',
	color: '#000',
	height: 'auto',
	margin: 'auto',
	opacity: 1,
	position: 'relative',
	top: '15%',
	width: '600px',
	'> div': {
		fontSize: '1.15em',
		fontWeight: 300,
		margin: 0,
		padding: '15px 40px 30px',
		textAlign: 'center'
	},
	'> div > p': {
		lineHeight: '2em',
		margin: 0,
		padding: '10px 0',
		textAlign: 'center'
	}
});

export const Title = styled.h1({
	borderRadius: '3px 3px 0 0',
	fontSize: '2.4em',
	fontWeight: 300,
	margin: 0,
	marginTop: '10px',
	padding: '0.4em',
	opacity: 1,
	textAlign: 'center'
});

export const CloseButton = styled.div({
	cursor: 'pointer',
	position: 'absolute',
	right: '0px',
	top: '20px'
});

export const CloseIcon = () => (
	<svg height="20px" width="20px" viewBox="0 0 22 22">
		<path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z" />
	</svg>
);

export const TextContainer = styled.div({
	'> p > a': {
		textDecoration: 'underline'
	}
});
