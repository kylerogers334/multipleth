import React from 'react';
import styled from 'styled-components';

const Container = styled.div(({ css }) => ({
	alignItems: 'center',
	border: '1px solid #000000',
	borderRadius: '2px',
	cursor: 'pointer',
	display: 'inline-flex',
	fontSize: '18px',
	height: '44px',
	justifyContent: 'center',
	marginRight: '20px',
	outline: 'none',
	width: '80px',
	...css
}));

const Button = ({ css, onClick, text }) => (
	<Container css={css} onClick={onClick}>
		{text}
	</Container>
);

export default Button;
