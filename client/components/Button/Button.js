import React from 'react';
import styled from 'styled-components';

const Container = styled.button({
	alignItems: 'center',
	border: '1px solid #000',
	borderRadius: '4px',
	cursor: 'pointer',
	display: 'inline-flex',
	fontSize: '16px',
	height: '36px',
	justifyContent: 'center',
	marginRight: '20px',
	outline: 'none',
	width: '64px'
});

const Button = ({ onClick, text }) => (
	<Container onClick={() => onClick()}>{text}</Container>
);

export default Button;
